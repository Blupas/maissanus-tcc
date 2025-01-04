import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsuarioScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    nome: 'Michell Shadow',
    idade: '17',
    altura: '1,66',
    peso: '68',
  });

  // Função para carregar dados salvos
  const loadUserData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('userData');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Espaço para a Foto do Usuário */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Substitua pela URL da foto do usuário
          style={styles.profileImage}
        />
        <Text style={styles.name}>{userData.nome}</Text>
      </View>

      {/* Informações do Usuário */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Idade: <Text style={styles.value}>{userData.idade} anos</Text></Text>
        <Text style={styles.infoText}>Altura: <Text style={styles.value}>{userData.altura} m</Text></Text>
        <Text style={styles.infoText}>Peso: <Text style={styles.value}>{userData.peso} kg</Text></Text>
      </View>

      {/* Botão para Editar */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditarUsuarioScreen', { userData, setUserData })}
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#6FA15A',
    marginBottom: 10,
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
