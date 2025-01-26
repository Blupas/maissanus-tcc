import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { authFirebase, createUserWithEmailAndPassword, db, doc } from '../firebaseConfig';
import { setDoc } from 'firebase/firestore'; // Importação do setDoc
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importação do AsyncStorage

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(authFirebase, email, password);
      console.log("Usuário registrado no Firebase Auth!");

      try {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username,
          weight,
          height: heightValue,
          age,
          gender,
          dataCadastro: new Date(),
        });

        await AsyncStorage.setItem("userData", JSON.stringify({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          username,
          weight,
          height: heightValue,
          age,
          gender,
          dataCadastro: new Date(),
        }));
        console.log("Documento no Firestore criado com sucesso!");
      } catch (error) {
        console.error("Erro ao criar o documento no Firestore:", error.message);
      }

      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro no registro: ', error.message);
      Alert.alert('Erro no registro', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#bbb"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuário (E-mail)"
          placeholderTextColor="#bbb"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#bbb"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
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
          placeholder="Altura (cm)"
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
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar ao login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#1C1C1E', justifyContent: 'center', padding: 20 },
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

export default RegisterScreen;
