import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase, db } from "../firebaseConfig"; 
import { getDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true);
    try {
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
        setLoading(false)
        navigation.navigate("Selecao"); // Certifique-se de que a navegação está configurada corretamente
      } else {
        console.log("Documento do usuário não encontrado!");
        Alert.alert(
          "Erro no login",
          "Usuário não encontrado no banco de dados."
        );
      }
    } catch (error) {
      console.error("Erro no login:", error.message);
      Alert.alert("Erro no login", "E-mail ou senha inválidos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        { !loading ? (
        <Text style={styles.loginButtonText}>Logar</Text>
        ) : (
          <ActivityIndicator color="#fff" size={30}/>
        )}
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
});

export default LoginScreen;
