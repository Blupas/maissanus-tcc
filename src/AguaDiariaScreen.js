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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from '../firebaseConfig'; // Importando Firestore

const { width } = Dimensions.get('window');

const AguaDiariaScreen = () => {
  const [hydration, setHydration] = useState([]);
  const [newAmount, setNewAmount] = useState('');
  const [newTime, setNewTime] = useState('');

  const hydrationCollection = collection(db, 'hydration');

  // Carregar dados de hidratação do Firestore quando o componente for montado
  useEffect(() => {
    const fetchHydrationData = async () => {
      try {
        const snapshot = await getDocs(hydrationCollection);
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Ordenar os dados com base no horário (convertido para 24h)
        const sortedData = fetchedData.sort((a, b) => {
          const timeA = convertTo24HourFormat(a.time);
          const timeB = convertTo24HourFormat(b.time);
          return timeA - timeB; // Ordem crescente
        });

        setHydration(sortedData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchHydrationData();
  }, []);

  // Função para converter o horário de 24h para 12h com AM/PM
  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(':').map(Number);

    // Verifica se a hora é válida
    if (isNaN(hour) || isNaN(minute)) {
      return 'Hora inválida';
    }

    const isPM = hour >= 12;
    const hour12 = hour % 12 || 12; // Ajusta para formato de 12h
    const suffix = isPM ? 'PM' : 'AM';
    return `${hour12}:${minute < 10 ? '0' + minute : minute} ${suffix}`;
  };

  // Função para converter o horário de 12h com AM/PM para 24h
  const convertTo24HourFormat = (time) => {
    const [hour, minute] = time.split(':').map(Number);
    const suffix = time.split(' ')[1]; // AM ou PM

    let hour24 = hour;

    if (suffix === 'PM' && hour < 12) {
      hour24 += 12; // Convertendo PM
    } else if (suffix === 'AM' && hour === 12) {
      hour24 = 0; // Convertendo 12 AM para 00
    }

    return hour24 * 60 + minute; // Retorna o horário em minutos para comparação fácil
  };

  // Alterar o status de conclusão
  const toggleCompletion = async (index) => {
    const updatedHydration = hydration.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setHydration(updatedHydration);

    const updatedItem = updatedHydration[index];
    const itemRef = doc(db, 'hydration', updatedItem.id);
    try {
      await updateDoc(itemRef, { completed: updatedItem.completed });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  // Adicionar nova entrada de água
  const addWater = async () => {
    if (newAmount.trim() === '' || isNaN(newAmount)) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida de água!');
      return;
    }
    if (newTime.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um horário válido!');
      return;
    }

    const formattedTime = convertTo12HourFormat(newTime); // Converte para 12h AM/PM

    if (formattedTime === 'Hora inválida') {
      Alert.alert('Erro', 'Por favor, insira um horário válido!');
      return;
    }

    const newEntry = {
      time: formattedTime, // Usa o horário convertido
      amount: `${newAmount} ml`,
      completed: false,
    };

    // Atualizar o estado local
    setHydration((prev) => {
      const updatedHydration = [...prev, newEntry];
      
      // Ordenar os dados com base no horário (convertido para 24h)
      updatedHydration.sort((a, b) => {
        const timeA = convertTo24HourFormat(a.time);
        const timeB = convertTo24HourFormat(b.time);
        return timeA - timeB; // Ordem crescente
      });

      return updatedHydration;
    });

    setNewAmount('');
    setNewTime('');

    try {
      await addDoc(hydrationCollection, newEntry);
    } catch (error) {
      console.error('Erro ao adicionar água:', error);
    }
  };

  // Resetar os dados de hidratação
  const resetHydration = async () => {
    try {
      const snapshot = await getDocs(hydrationCollection);

      // Excluir cada documento do Firestore
      const deletePromises = snapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(db, 'hydration', docSnapshot.id))
      );
      await Promise.all(deletePromises);

      // Limpar o estado local
      setHydration([]);
    } catch (error) {
      console.error('Erro ao resetar dados de hidratação:', error);
    }
  };

  // Calcular o total de água consumida
  const calculateTotalWater = () => {
    return hydration
      .filter((item) => item.completed)
      .reduce(
        (total, item) =>
          total + parseInt(item.amount.replace('ml', '').trim(), 10),
        0
      );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Total de Água Consumida: {calculateTotalWater()} ml
          </Text>
        </View>

        <Text style={styles.title}>Recomendação de Ingestão de Água</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.columnHeader, styles.flex2]}>Horário</Text>
            <Text style={[styles.columnHeader, styles.flex2]}>
              Quantidade de Água
            </Text>
            <Text style={styles.columnHeader}>Status</Text>
          </View>
          {hydration.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.cell, styles.flex2]}>{item.time}</Text>
              <Text style={[styles.cell, styles.flex2]}>{item.amount}</Text>
              <TouchableOpacity
                style={styles.cell}
                onPress={() => toggleCompletion(index)}
              >
                {item.completed ? (
                  <Ionicons name="checkmark-circle" size={24} color="#6FA15A" />
                ) : (
                  <Ionicons
                    name="ellipse-outline"
                    size={24}
                    color="#FF6347"
                  />
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
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetHydration}>
          <Text style={styles.resetButtonText}>Resetar Água</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.footerSpacing} />
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
  title: {
    fontSize: 24,
    color: '#6FA15A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
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
    flexWrap: 'wrap',
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
    minWidth: width * 0.2,
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
    marginTop: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerSpacing: {
    height: 40,
  },
});

export default AguaDiariaScreen;
