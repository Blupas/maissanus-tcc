import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetalhesScreen = ({ route }) => {
  const { selection } = route.params; // Obtém a seleção do treino passado pela navegação

  const renderDetails = () => {
    switch (selection) {
      case 'Forca':
        return (
          <Text style={styles.detailText}>Treino de Força: Foco no aumento de força muscular.</Text>
        );
      case 'Hipertrofia':
        return (
          <Text style={styles.detailText}>Treino de Hipertrofia: Foco no aumento do volume muscular.</Text>
        );
      case 'Agua':
        return (
          <Text style={styles.detailText}>Controle de Água: Monitore seu consumo diário de líquidos.</Text>
        );
      case 'Dieta':
        return (
          <Text style={styles.detailText}>Planejamento de Dieta: Siga um plano alimentar para atingir seus objetivos.</Text>
        );
      default:
        return <Text style={styles.detailText}>Nenhuma opção selecionada</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Plano Selecionado</Text>
      {renderDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  detailText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DetalhesScreen;
