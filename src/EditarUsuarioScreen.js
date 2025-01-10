import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { authFirebase, db, doc } from '../firebaseConfig';
import { updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const EditarUsuarioScreen = ({ navigation, route }) => {
  const { userData } = route.params; // Dados do usuário vindo da tela anterior

  // Estados para os campos editáveis
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [weight, setWeight] = useState(userData.weight);
  const [heightValue, setHeightValue] = useState(userData.height);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);

  // Função para atualizar as informações do usuário no Firestore
  const handleUpdate = async () => {
    const currentUser = authFirebase.currentUser;

    if (!currentUser) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      // Atualizar documento no Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        username,
        email,
        weight,
        height: heightValue,
        age,
        gender,
      });

      // Atualizar AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify({
        uid: currentUser.uid,
        email,
        username,
        weight,
        height: heightValue,
        age,
        gender,
      }));

      Alert.alert('Sucesso', 'Informações atualizadas com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
      Alert.alert('Erro', 'Não foi possível atualizar as informações.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          placeholderTextColor="#bbb"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          value={heightValue}
          onChangeText={setHeightValue}
        />
        <TextInput
          style={styles.input}
          placeholder="Idade"
          placeholderTextColor="#bbb"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
        <View style={styles.genderContainer}>
          <Text style={styles.label}>Sexo:</Text>
          <Picker
            selectedValue={gender}
            style={[styles.picker, styles.input]}
            onValueChange={(itemValue) => setGender(itemValue)}
          >
            <Picker.Item label="Selecione" value="" />
            <Picker.Item label="Masculino" value="male" />
            <Picker.Item label="Feminino" value="female" />
            <Picker.Item label="Outro" value="other" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleUpdate}>
        <Text style={styles.registerButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar ao Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1E', justifyContent: 'center', padding: 20 },
  inputContainer: { marginHorizontal: 20 },
  input: { backgroundColor: '#2C2C2E', color: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#444' },
  genderContainer: { marginBottom: 15 },
  label: { color: '#ddd', marginBottom: 5, fontSize: 16, fontWeight: 'bold' },
  picker: { backgroundColor: '#2C2C2E', color: '#fff', borderRadius: 10 },
  registerButton: { backgroundColor: '#6FA15A', padding: 15, borderRadius: 15, marginHorizontal: 20, alignItems: 'center' },
  registerButtonText: { color: '#fff', fontSize: width * 0.045, fontWeight: 'bold', textTransform: 'uppercase' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backButtonText: { color: '#6FA15A', fontSize: width * 0.04, fontWeight: '600' },
});

export default EditarUsuarioScreen;
