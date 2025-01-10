import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase, db } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "https://redacaonline.com.br/wp-content/uploads/2022/02/ma-alimentacao-jovens.jpg",
    "https://terradomandu.com.br/wp-content/uploads/2017/07/fast-food-x-saudaveis-1.jpg",
    "https://cdn.weasyl.com/static/media/c1/b5/16/c1b516b07b3b99dfa0af24cb82b6a5f65869ac2739d98c723521fd9bd950218a.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    try {
      // Autenticando usuário no Firebase
      const userCredential = await signInWithEmailAndPassword(
        authFirebase,
        username,
        password
      );
      const userId = userCredential.user.uid;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        await AsyncStorage.setItem("userData", JSON.stringify(userData));

        console.log("Usuário logado:", userData);
        navigation.navigate("Selecao"); 
      } else {
        console.log("Documento do usuário não encontrado!");
        Alert.alert(
          "Erro no login",
          "Usuário não encontrado no banco de dados."
        );
      }
    } catch (error) {
      console.error("Erro no login:", error.message);
      Alert.alert("Erro no login", error.message);
    }
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

      {/* Formulário de Login */}
      <TextInput
        style={styles.input}
        placeholder="Usuário (E-mail)"
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Logar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerButtonText}>
          Não tem uma conta? Faça Cadastro
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#1F1F1F",
  },
  title: {
    fontSize: 24,
    color: "#6FA15A",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: "#6FA15A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    marginTop: 15,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#6FA15A",
    fontSize: 16,
  },
  carouselContainer: {
    marginBottom: 50,
    justifyContent: "top",
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "#aaa",
  },
  activeDot: {
    backgroundColor: "#6FA15A",
  },
});

export default LoginScreen;
