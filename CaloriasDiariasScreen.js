import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

const { width } = Dimensions.get('window');

const CaloriasDiariasScreen = () => {
  const [meals, setMeals] = useState([
    { name: 'Omelete', calories: '150' },
    { name: 'Salada de Frutas', calories: '200' },
    { name: 'Peito de Frango Grelhado', calories: '300' },
    { name: 'Arroz Integral', calories: '215' },
    { name: 'Brócolis Cozidos', calories: '55' },
    { name: 'Iogurte Natural', calories: '100' },
    { name: 'Maçã', calories: '95' },
    { name: 'Peixe Assado', calories: '250' },
  ]);
  const [newMeal, setNewMeal] = useState('');
  const [newCalories, setNewCalories] = useState('');

  const addMeal = () => {
    if (newMeal.trim() && newCalories.trim() && !isNaN(newCalories)) {
      setMeals([...meals, { name: newMeal.trim(), calories: `${newCalories.trim()} kcal` }]);
      setNewMeal('');
      setNewCalories('');
    } else {
      Alert.alert('Erro', 'Por favor, insira um nome válido e calorias numéricas.');
    }
  };

  const removeMeal = (index) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
  };

  const resetCalories = () => {
    setMeals([]); // Limpa a lista de refeições
  };

  const calculateTotalCalories = () => {
    return meals.reduce((total, meal) => {
      const parsedCalories = parseInt(meal.calories.replace('kcal', '').trim(), 10);
      return total + (isNaN(parsedCalories) ? 0 : parsedCalories);
    }, 0);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Ingestão Calórica Diária</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.columnHeader, styles.flex2]}>Prato</Text>
            <Text style={styles.columnHeader}>Calorias</Text>
            <Text style={styles.columnHeader}>Ações</Text>
          </View>
          {meals.map((meal, index) => (
            <View style={styles.row} key={index}>
              <Text style={[styles.cell, styles.flex2]}>{meal.name}</Text>
              <Text style={styles.cell}>{meal.calories}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeMeal(index)}>
                <Text style={styles.removeButtonText}>Remover</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total de Calorias: {calculateTotalCalories()} kcal</Text>
        </View>

        <Text style={styles.addMealTitle}>Adicionar Refeição</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome da Refeição"
            placeholderTextColor="#bbb"
            value={newMeal}
            onChangeText={setNewMeal}
          />
          <TextInput
            style={styles.input}
            placeholder="Calorias"
            placeholderTextColor="#bbb"
            value={newCalories}
            onChangeText={setNewCalories}
            keyboardType="numeric"
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={addMeal}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={resetCalories}>
        <Text style={styles.resetButtonText}>Resetar Calorias</Text>
      </TouchableOpacity>
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
  },
  flex2: {
    flex: 2,
  },
  addMealTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginHorizontal: 20,
  },
  input: {
    backgroundColor: '#2C2C2E',
    color: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  addButton: {
    backgroundColor: '#6FA15A',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  totalText: {
    fontSize: 18,
    color: '#6FA15A',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CaloriasDiariasScreen;
