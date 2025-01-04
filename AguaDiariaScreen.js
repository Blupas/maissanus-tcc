import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AguaDiariaScreen = () => {
  const [hydration, setHydration] = useState([
    { time: '07:00', amount: '250 ml', completed: false },
    { time: '09:00', amount: '200 ml', completed: false },
    { time: '11:00', amount: '250 ml', completed: false },
    { time: '13:00', amount: '250 ml', completed: false },
    { time: '15:00', amount: '200 ml', completed: false },
    { time: '17:00', amount: '200 ml', completed: false },
    { time: '19:00', amount: '200 ml', completed: false },
  ]);

  const [newAmount, setNewAmount] = useState('');
  const [newTime, setNewTime] = useState('');

  const toggleCompletion = (index) => {
    const updatedHydration = hydration.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setHydration(updatedHydration);
  };

  const addWater = () => {
    if (newAmount.trim() === '' || isNaN(newAmount)) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida de água!');
      return;
    }
    if (newTime.trim() === '') {
      Alert.alert('Erro', 'Por favor, insira um horário válido!');
      return;
    }

    const newEntry = {
      time: newTime,
      amount: `${newAmount} ml`,
      completed: false,
    };

    setHydration([...hydration, newEntry]);
    setNewAmount('');
    setNewTime('');
  };

  const resetHydration = () => {
    setHydration([]);
  };

  const calculateTotalWater = () => {
    return hydration
      .filter(item => item.completed)
      .reduce((total, item) => total + parseInt(item.amount.replace('ml', '').trim(), 10), 0);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Total de Água Consumida: {calculateTotalWater()} ml</Text>
        </View>

        <Text style={styles.title}>Recomendação de Ingestão de Água</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.columnHeader, styles.flex2]}>Horário</Text>
            <Text style={[styles.columnHeader, styles.flex2]}>Quantidade de Água</Text>
            <Text style={styles.columnHeader}>Status</Text>
          </View>
          {hydration.map((item, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.cell, styles.flex2]}>{item.time}</Text>
              <Text style={[styles.cell, styles.flex2]}>{item.amount}</Text>
              <TouchableOpacity style={styles.cell} onPress={() => toggleCompletion(index)}>
                {item.completed ? (
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
