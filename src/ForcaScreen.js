// ForcaScreen.js
import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const ForcaScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator='true'>
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Peito</Text>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Supino Reto</Text>
          <Text style={styles.exerciseDetails}>3 séries de 8-12 repetições</Text>
        </View>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Supino Inclinado</Text>
          <Text style={styles.exerciseDetails}>3 séries de 8-12 repetições</Text>
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Costas</Text>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Puxada Aberta</Text>
          <Text style={styles.exerciseDetails}>3 séries de 10-15 repetições</Text>
        </View>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Remada Curvada</Text>
          <Text style={styles.exerciseDetails}>3 séries de 8-12 repetições</Text>
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Pernas</Text>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Agachamento</Text>
          <Text style={styles.exerciseDetails}>4 séries de 8-12 repetições</Text>
        </View>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Leg Press</Text>
          <Text style={styles.exerciseDetails}>3 séries de 10-15 repetições</Text>
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Ombros</Text>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Desenvolvimento com Halteres</Text>
          <Text style={styles.exerciseDetails}>3 séries de 8-12 repetições</Text>
        </View>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Elevação Lateral</Text>
          <Text style={styles.exerciseDetails}>3 séries de 10-15 repetições</Text>
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.groupTitle}>Braços</Text>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Rosca Direta</Text>
          <Text style={styles.exerciseDetails}>3 séries de 8-12 repetições</Text>
        </View>
        <View style={styles.exercise}>
          <Text style={styles.exerciseName}>Tríceps Corda</Text>
          <Text style={styles.exerciseDetails}>3 séries de 10-15 repetições</Text>
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
  exercise: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#ccc',
  },
});

export default ForcaScreen;
