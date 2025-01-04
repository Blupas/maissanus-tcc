import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
// import { auth, db } from './firebaseConfig';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';

const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const handleOpenGallery = () => {
    Alert.alert('Galeria', 'Função para abrir a galeria será implementada aqui.');
  };
  

  const handleRegister = async () => {
    try {
      // Criar o usuário no Firebase Authentication
      // const userCredential = await createUserWithEmailAndPassword(auth, username, password);
      // const userId = userCredential.user.uid;

      // // Salvar os dados do usuário no Firestore
      // await setDoc(doc(db, 'users', userId), {
      //   username,
      //   weight,
      //   height: heightValue,
      //   age,
      //   gender,
      //   profileImage,
      // });

      Alert.alert('Registro realizado com sucesso!', 'Bem-vindo!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);
    } catch (error) {
      console.error('Erro no registro: ', error.message);
      Alert.alert('Erro no registro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícone de Perfil Grande */}
      <TouchableOpacity onPress={handleOpenGallery}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{ uri: profileImage }} />
        </View>
      </TouchableOpacity>

      {/* Campos de Registro */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário (E-mail)"
          placeholderTextColor="#bbb"
          value={username}
          onChangeText={setUsername}
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

        {/* Seleção de Sexo */}
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

      {/* Botão de Registro */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Botão Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1E', justifyContent: 'center', padding: 20 },
  profileContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: width * 0.3, height: width * 0.3, borderRadius: (width * 0.3) / 2, backgroundColor: '#444', borderColor: '#6FA15A', borderWidth: 2 },
  inputContainer: { marginHorizontal: 20 },
  input: { backgroundColor: '#2C2C2E', color: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#444' },
  genderContainer: { marginBottom: 15 },
  label: { color: '#ddd', marginBottom: 5, fontSize: 16, fontWeight: 'bold' },
  picker: { backgroundColor: '#2C2C2E', color: '#fff', borderRadius: 10 },
  RegisterButton: { backgroundColor: '#6FA15A', padding: 15, borderRadius: 15, marginHorizontal: 20, alignItems: 'center' },
  RegisterButtonText: { color: '#fff', fontSize: width * 0.045, fontWeight: 'bold', textTransform: 'uppercase' },
  backButton: { marginTop: 20, alignItems: 'center' },
  backButtonText: { color: '#6FA15A', fontSize: width * 0.04, fontWeight: '600' },
});

export default RegisterScreen;
