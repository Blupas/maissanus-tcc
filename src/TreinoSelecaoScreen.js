import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Importando ícones

const TreinoSelecaoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha o tipo de treino:</Text>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("ForcaScreen", { isEnabled: true })}
      >
        <Text style={styles.optionText}>
          <MaterialIcons name="fitness-center" size={24} color="#fff" />
          Treino de Força
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("HipertrofiaScreen")} // Navegação correta
      >
        <Text style={styles.optionText}>
          <MaterialIcons name="accessibility" size={24} color="#fff" />
          Treino de Hipertrofia
        </Text>
      </TouchableOpacity>

      {/* Nova opção de treino para resistência */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("ResistenciaScreen")} // Navegação correta
      >
        <Text style={styles.optionText}>
          <MaterialIcons name="directions-run" size={24} color="#fff" />
          Treino de Resistência
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1F1F1F", // Fundo escuro
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Título branco para contraste
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: "#6FA15A", // Cor verde para os botões
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#fff", // Texto branco
    fontWeight: "bold",
    marginLeft: 10, // Espaço entre o ícone e o texto
    flexDirection: "row", // Organiza ícone e texto lado a lado
    alignItems: "center", // Alinha o ícone e o texto
  },
});

export default TreinoSelecaoScreen;
