import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert, // Importando o Alert
} from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [heightValue, setHeightValue] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://via.placeholder.com/150'
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    'https://redacaonline.com.br/wp-content/uploads/2022/02/ma-alimentacao-jovens.jpg',
    'https://terradomandu.com.br/wp-content/uploads/2017/07/fast-food-x-saudaveis-1.jpg',
    'https://cdn.weasyl.com/static/media/c1/b5/16/c1b516b07b3b99dfa0af24cb82b6a5f65869ac2739d98c723521fd9bd950218a.png',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Troca de imagem a cada 4 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  const handleLogin = () => {
    console.log('Login confirmado com:', {
      username,
      password,
      weight,
      heightValue,
      age,
      gender,
    });
    Alert.alert('Confirmação de Login', 'Login realizado com sucesso!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Selecao'), // Navega para a tela de seleção
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Carrossel */}
      <View style={styles.carouselContainer}>
        <Image
          style={styles.carouselImage}
          source={{ uri: images[activeIndex] }}
        />
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveIndex(index)}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/* Formulário de Cadastro */}
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.LoginButton} onPress={handleLogin}>
        <Text style={styles.LoginButtonText}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.loginButtonText}>
          Não tem uma conta? Faça Cadastro
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 24,
    color: '#6FA15A',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  LoginButton: {
    backgroundColor: '#6FA15A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  LoginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#6FA15A',
    fontSize: 16,
  },
  carouselContainer: {
    marginBottom: 50,
    justifyContent: 'top',
    alignItems: 'center',
  },
  carouselImage: {
  width: '100%',
  height: 200, // Aumentei a altura para 200
  borderRadius: 10,
},
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: '#aaa',
  },
  activeDot: {
    backgroundColor: '#6FA15A',
  },
});

export default LoginScreen;
