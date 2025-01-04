import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ route, navigation }) => {
  const { selection } = route.params || {};  // Verificando se os parâmetros existem

  useEffect(() => {
    if (!selection) {
      // Se não houver seleção, redireciona para a tela de seleção
      navigation.navigate('Selecao');
    }
  }, [selection, navigation]);

  return (
    <View style={styles.container}>
      {selection ? (
        <Text style={styles.selectionText}>Você escolheu o treino: {selection}</Text>
      ) : (
        <Text style={styles.selectionText}>Nenhum treino selecionado</Text>
      )}

      {/* Caso o usuário queira mudar o treino */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Selecao')}
      >
        <Text style={styles.buttonText}>Alterar Treino</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
  },
  selectionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6FA15A',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
