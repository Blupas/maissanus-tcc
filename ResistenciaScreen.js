import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Dimensions } from 'react-native';

const ResistenciaScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Treino de Resistência</Text>

        <Text style={styles.sectionTitle}>Aquecimento</Text>
        <Text style={styles.text}>
          - 5 minutos de caminhada rápida ou corrida leve
        </Text>
        <Text style={styles.text}>- 3 minutos de alongamento dinâmico</Text>

        <Text style={styles.sectionTitle}>Exercícios Principais</Text>
        <Text style={styles.text}>
          Faça 3 a 4 circuitos com os seguintes exercícios:
        </Text>

        <Text style={styles.subSectionTitle}>1. Flexões (Push-ups)</Text>
        <Text style={styles.text}>12 a 15 repetições</Text>

        <Text style={styles.subSectionTitle}>2. Agachamentos</Text>
        <Text style={styles.text}>15 a 20 repetições</Text>

        <Text style={styles.subSectionTitle}>3. Afundo (Lunges)</Text>
        <Text style={styles.text}>12 a 15 repetições por perna</Text>

        <Text style={styles.subSectionTitle}>4. Burpees</Text>
        <Text style={styles.text}>10 a 12 repetições</Text>

        <Text style={styles.subSectionTitle}>5. Prancha (Plank)</Text>
        <Text style={styles.text}>30 a 45 segundos</Text>

        <Text style={styles.sectionTitle}>Intervalo entre os circuitos</Text>
        <Text style={styles.text}>1 a 2 minutos de descanso</Text>

        <Text style={styles.sectionTitle}>Resfriamento</Text>
        <Text style={styles.text}>
          - 3 a 5 minutos de caminhada leve ou alongamento estático
        </Text>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Treino de Resistência - Mantenha o foco!</Text>
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 30, // Para evitar sobreposição do rodapé
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6FA15A',
    marginVertical: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
    lineHeight: 24, // Melhor legibilidade
  },
  footer: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  footerText: {
    fontSize: width < 350 ? 12 : 14, // Ajuste de fonte para telas menores
    color: '#ccc',
    textAlign: 'center',
  },
});

export default ResistenciaScreen;
