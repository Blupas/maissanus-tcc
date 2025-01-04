// PerdaDePesoScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PerdaDePesoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Grupo de alimentos - Café da Manhã */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Café da Manhã</Text>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Aveia com Frutas</Text>
          <Text style={styles.dishDetails}>Uma tigela de aveia com frutas frescas e um pouco de mel.</Text>
        </View>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Ovos Mexidos</Text>
          <Text style={styles.dishDetails}>Ovos mexidos com espinafre e tomate.</Text>
        </View>
      </View>

      {/* Grupo de alimentos - Almoço */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Almoço</Text>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Peito de Frango Grelhado</Text>
          <Text style={styles.dishDetails}>Peito de frango grelhado com legumes cozidos no vapor.</Text>
        </View>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Salada de Quinoa</Text>
          <Text style={styles.dishDetails}>Quinoa com legumes variados e um molho leve de limão.</Text>
        </View>
      </View>

      {/* Grupo de alimentos - Lanche da Tarde */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Lanche da Tarde</Text>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Iogurte Grego</Text>
          <Text style={styles.dishDetails}>Iogurte grego sem açúcar com nozes e mel.</Text>
        </View>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Frutas Secas</Text>
          <Text style={styles.dishDetails}>Um punhado de frutas secas como amêndoas e nozes.</Text>
        </View>
      </View>

      {/* Grupo de alimentos - Jantar */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Jantar</Text>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Sopa de Legumes</Text>
          <Text style={styles.dishDetails}>Sopa leve de legumes com pedaços de frango desfiado.</Text>
        </View>
        <View style={styles.dish}>
          <Text style={styles.dishName}>Peixe Assado</Text>
          <Text style={styles.dishDetails}>Peixe assado com uma porção de arroz integral e brócolis.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 15,
  },
  group: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 22,
    color: '#6FA15A',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dish: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  dishName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  dishDetails: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default PerdaDePesoScreen;
