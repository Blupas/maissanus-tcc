import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalculosScreen = () => {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('');
  const [imc, setImc] = useState(null);
  const [tmb, setTmb] = useState(null);

  const calcularIMC = () => {
    if (!peso || !altura) {
      Alert.alert('Erro', 'Por favor, insira todos os campos para calcular o IMC!');
      return;
    }
    const alturaMetros = parseFloat(altura) / 100;
    const imcResultado = parseFloat(peso) / (alturaMetros * alturaMetros);
    setImc(imcResultado.toFixed(2));
  };

  const calcularTMB = () => {
    if (!peso || !altura || !idade || !sexo) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos para calcular a TMB!');
      return;
    }
    let tmbResultado;

    if (sexo === 'masculino') {
      tmbResultado = 66.5 + (13.75 * parseFloat(peso)) + (5.003 * parseFloat(altura)) - (6.75 * parseFloat(idade));
    } else if (sexo === 'feminino') {
      tmbResultado = 655 + (9.563 * parseFloat(peso)) + (1.850 * parseFloat(altura)) - (4.676 * parseFloat(idade));
    }

    setTmb(tmbResultado.toFixed(2));
  };

  const resetCampos = () => {
    setPeso('');
    setAltura('');
    setIdade('');
    setSexo('');
    setImc(null);
    setTmb(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cálculos IMC/TMB</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />
      <TextInput
        style={styles.input}
        placeholder="Altura (cm)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <Picker
        selectedValue={sexo}
        onValueChange={(itemValue) => setSexo(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o sexo" value="" />
        <Picker.Item label="Masculino" value="masculino" />
        <Picker.Item label="Feminino" value="feminino" />
      </Picker>

      <TouchableOpacity style={styles.button} onPress={calcularIMC}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={calcularTMB}>
        <Text style={styles.buttonText}>Calcular TMB</Text>
      </TouchableOpacity>

      {imc && <Text style={styles.result}>IMC: {imc}</Text>}
      {tmb !== null && tmb !== undefined && <Text style={styles.result}>TMB: {tmb} kcal/dia</Text>}

      <TouchableOpacity style={styles.resetButton} onPress={resetCampos}>
        <Text style={styles.resetButtonText}>Limpar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 24,
    color: '#6FA15A',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#6FA15A',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6347',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CalculosScreen;
