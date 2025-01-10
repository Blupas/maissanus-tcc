import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsuarioScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({});

  // Função para carregar dados salvos
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
    console.log(userData); // Log para verificar os dados carregados
  }, [userData]);

  return (
    <View style={styles.container}>
      {/* Espaço para a Foto do Usuário */}
      <View style={styles.profileContainer}>
        <Text style={styles.name}>{userData.username || 'Usuário'}</Text>
      </View>

      {/* Informações do Usuário */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Idade: <Text style={styles.value}>{userData.age || '--'} anos</Text>
        </Text>
        <Text style={styles.infoText}>
          Altura: <Text style={styles.value}>{userData.height || '--'} cm</Text>
        </Text>
        <Text style={styles.infoText}>
          Peso: <Text style={styles.value}>{userData.weight || '--'} kg</Text>
        </Text>
      </View>

      {/* Botão para Editar */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate('EditarUsuarioScreen', { userData, setUserData })
        }
      >
        <Text style={styles.editButtonText}>Editar Informações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 20,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    color: '#6FA15A',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  value: {
    color: '#6FA15A',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#6FA15A',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UsuarioScreen;
