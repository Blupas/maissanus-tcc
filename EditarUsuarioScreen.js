import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarUsuarioScreen = ({ navigation, route }) => {
  const { userData, setUserData } = route.params;

  const [nome, setNome] = useState(userData.nome);
  const [idade, setIdade] = useState(userData.idade);
  const [altura, setAltura] = useState(userData.altura);
  const [peso, setPeso] = useState(userData.peso);

  const salvarAlteracoes = async () => {
    const updatedData = { nome, idade, altura, peso };
    try {
      // Salvar no AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(updatedData));

      // Atualizar o estado na tela anterior
      setUserData(updatedData);

      alert('Informações salvas com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Informações do Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={idade}
        onChangeText={setIdade}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="decimal-pad"
      />

      <TouchableOpacity style={styles.saveButton} onPress={salvarAlteracoes}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#6FA15A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6FA15A',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditarUsuarioScreen;
