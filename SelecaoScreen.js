import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TelaSelecao = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Cabeçalho como um único botão */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate('UsuarioScreen')}  // Navega para a tela de Usuário
      >
        <Text style={styles.headerTitle}>Usuário</Text>
        <Ionicons name="person-circle-outline" size={48} color="#fff" />
      </TouchableOpacity>

      {/* Corpo da Tela */}
      <Text style={styles.title}>Tela de Seleção</Text>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Treinos</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('TreinoSelecaoScreen')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Verificar Treinos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Água Diária</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('AguaDiaria')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Verificar Água Diária</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Dieta</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('CaloriasDiarias')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Planejamento da Dieta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Cálculos IMC/TMB</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Calculos')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Ir para Cálculos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#333',  // Cor de fundo do cabeçalho
    height: 80,  // Definindo altura do cabeçalho
    marginTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#6FA15A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  option: {
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  optionButton: {
    backgroundColor: '#6FA15A',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaSelecao;
