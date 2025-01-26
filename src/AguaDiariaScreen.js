import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  db,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  deleteDoc,
  addDoc,
} from '../firebaseConfig'; // Importando Firestore

import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const AguaDiariaScreen = () => {
  const [hydration, setHydration] = useState([]);
  const [newAmount, setNewAmount] = useState('');
  const [newTime, setNewTime] = useState('');
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData)); // Convertendo a string JSON para objeto
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    if (userData.uid) {
      fetchHydrationData();
    }
  }, [userData]);

  const fetchHydrationData = async () => {
    if (!userData.uid) return;

    const today = new Date().toISOString().split('T')[0]; // Data do dia no formato YYYY-MM-DD
    const userDocRef = doc(collection(db, 'hydration'), userData.uid);
    const dateCollection = collection(userDocRef, today);

    try {
      const snapshot = await getDocs(dateCollection);
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const sortedData = fetchedData.sort((a, b) => {
        const timeA = convertTo24HourFormat(a.time);
        const timeB = convertTo24HourFormat(b.time);
        return timeA - timeB;
      });

      setHydration(sortedData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const convertTo24HourFormat = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };

  const toggleDrinked = async (index) => {
    const updatedHydration = hydration.map((item, i) =>
      i === index ? { ...item, drinked: !item.drinked } : item
    );
    setHydration(updatedHydration);

    const updatedItem = updatedHydration[index];
    const userDocRef = doc(collection(db, 'hydration'), userData.uid);
    const dateCollection = collection(userDocRef, updatedItem.date);
    const itemRef = doc(dateCollection, updatedItem.id);

    try {
      await updateDoc(itemRef, { drinked: updatedItem.drinked });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const addWater = async () => {
    setLoading(true);
    if (newAmount.trim() === '' || isNaN(newAmount)) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida de água!');
      setLoading(false);
      return;
    }
    if (newTime.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um horário válido!');
      setLoading(false);
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const userDocRef = doc(collection(db, 'hydration'), userData.uid);
    const dateCollection = collection(userDocRef, today);

    const newEntry = {
      date: today,
      time: newTime,
      amount: `${newAmount} ml`,
      drinked: false,
    };

    try {
      const docRef = await addDoc(dateCollection, newEntry);
      setHydration((prev) => {
        const updatedHydration = [...prev, { ...newEntry, id: docRef.id }];

        updatedHydration.sort((a, b) => {
          const timeA = convertTo24HourFormat(a.time);
          const timeB = convertTo24HourFormat(b.time);
          return timeA - timeB;
        });

        return updatedHydration;
      });

      setNewAmount('');
      setNewTime('');
    } catch (error) {
      console.error('Erro ao adicionar água:', error);
    }
    setLoading(false);
  };

  const resetHydration = async () => {
    if (!userData.uid) return;

    const today = new Date().toISOString().split('T')[0];
    const userDocRef = doc(collection(db, 'hydration'), userData.uid);
    const dateCollection = collection(userDocRef, today);

    try {
      const snapshot = await getDocs(dateCollection);

      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      setHydration([]);
      Alert.alert('Sucesso', 'Todos os registros de água foram removidos!');
    } catch (error) {
      console.error('Erro ao remover registros:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Rastreamento de Água Diária</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.columnHeader, styles.flex2]}>Horário</Text>
            <Text style={[styles.columnHeader, styles.flex2]}>Quantidade</Text>
            <Text style={styles.columnHeader}>Status</Text>
          </View>
          {hydration.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.cell, styles.flex2]}>{item.time}</Text>
              <Text style={[styles.cell, styles.flex2]}>{item.amount}</Text>
              <TouchableOpacity
                style={styles.cell}
                onPress={() => toggleDrinked(index)}
              >
                {item.drinked ? (
                  <Ionicons name="checkmark-circle" size={24} color="#6FA15A" />
                ) : (
                  <Ionicons name="ellipse-outline" size={24} color="#FF6347" />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.addWaterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Horário (HH:MM)"
            value={newTime}
            onChangeText={(text) => setNewTime(text)}
          />
          <TextInput
            style={[styles.input, { marginLeft: 10 }]}
            placeholder="Quantidade (ml)"
            keyboardType="numeric"
            value={newAmount}
            onChangeText={(text) => setNewAmount(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addWater}>
            {!loading ? (
              <Text style={styles.addButtonText}>Adicionar</Text>
            ) : (
              <ActivityIndicator color="#fff" size={30} />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetHydration}>
          <Text style={styles.resetButtonText}>Remover Água</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 15,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#333',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#6FA15A',
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#6FA15A',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#333',
    alignItems: 'center',
  },
  columnHeader: {
    flex: 1,
    padding: 10,
    backgroundColor: '#6FA15A',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    color: '#fff',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#6FA15A',
  },
  flex2: {
    flex: 2,
  },
  addWaterContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#fff',
    padding: 15,
    borderRadius: 15,
    flex: 1,
  },
  addButton: {
    backgroundColor: '#6FA15A',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AguaDiariaScreen;
