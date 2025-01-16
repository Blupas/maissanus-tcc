import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { db, collection, addDoc, getDocs, doc, deleteDoc } from "../firebaseConfig";

const CaloriasDiariasScreen = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const [newCalories, setNewCalories] = useState("");
  const [loading, setLoading] = useState(false);

  const mealsCollection = collection(db, "meals");

  // Carregar refeições do Firestore ao inicializar
  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(mealsCollection);
        const fetchedMeals = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMeals(fetchedMeals);
      } catch (error) {
        console.error("Erro ao carregar refeições:", error);
        Alert.alert("Erro", "Não foi possível carregar as refeições.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  // Adicionar nova refeição ao Firestore
  const addMeal = async () => {
    if (newMeal.trim() && newCalories.trim() && !isNaN(newCalories)) {
      const mealData = { name: newMeal.trim(), calories: `${newCalories.trim()} kcal` };
      setLoading(true);
      try {
        const docRef = await addDoc(mealsCollection, mealData);
        setMeals([...meals, { id: docRef.id, ...mealData }]);
        setNewMeal("");
        setNewCalories("");
      } catch (error) {
        console.error("Erro ao adicionar refeição:", error);
        Alert.alert("Erro", "Não foi possível adicionar a refeição.");
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert("Erro", "Por favor, insira um nome válido e calorias numéricas.");
    }
  };

  // Remover refeição do Firestore
  const removeMeal = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "meals", id));
      setMeals(meals.filter((meal) => meal.id !== id));
    } catch (error) {
      console.error("Erro ao remover refeição:", error);
      Alert.alert("Erro", "Não foi possível remover a refeição.");
    } finally {
      setLoading(false);
    }
  };

  // Calcular o total de calorias
  const calculateTotalCalories = () => {
    return meals.reduce((total, meal) => {
      const parsedCalories = parseInt(meal.calories.replace("kcal", "").trim(), 10);
      return total + (isNaN(parsedCalories) ? 0 : parsedCalories);
    }, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingestão Calórica Diária</Text>

      {loading && <ActivityIndicator size="large" color="#6FA15A" />}

      <FlatList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={[styles.cell, styles.flex2]}>{item.name}</Text>
            <Text style={styles.cell}>{item.calories}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeMeal(item.id)}
            >
              <Text style={styles.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total de Calorias: {calculateTotalCalories()} kcal</Text>
      </View>

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

      <TouchableOpacity style={styles.addButton} onPress={addMeal} disabled={loading}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1F1F",
    padding: 15,
  },
  title: {
    fontSize: 24,
    color: "#6FA15A",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#333",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  cell: {
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  totalContainer: {
    marginVertical: 20,
  },
  totalText: {
    fontSize: 18,
    color: "#6FA15A",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#2C2C2E",
    color: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#444",
  },
  addButton: {
    backgroundColor: "#6FA15A",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#FF6347",
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CaloriasDiariasScreen;
