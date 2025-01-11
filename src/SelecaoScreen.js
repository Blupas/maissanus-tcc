import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Importando as imagens locais
import image1 from '../assets/foto1 (2).jpg';
import image2 from '../assets/foto1 (3).jpg';
import image3 from '../assets/foto1 (4).jpg';
import image4 from '../assets/foto1 (5).jpg';
import image5 from '../assets/foto1 (6).jpg';
import image6 from '../assets/foto1 (7).jpg';
import image7 from '../assets/foto1 (8).jpg';
import image8 from '../assets/foto (1).jpg';


const TelaSelecao = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  // Agora incluindo todas as imagens
  const images = [image1, image2, image3, image4, image5, image6, image7, image8];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho como um único botão */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate('UsuarioScreen')}  // Navega para a tela de Usuário
      >
        <Text style={styles.headerTitle}>Seu perfil</Text>
        <Ionicons name="person-circle-outline" size={48} color="#fff" />
      </TouchableOpacity>

      {/* Carrossel de Imagens */}
      <View style={styles.carouselContainer}>
        <Image
          style={styles.carouselImage}
          source={images[activeIndex]}  // Usando a imagem do array
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

      {/* Corpo da Tela */}
      <Text style={styles.title}>Tela de Seleção</Text>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Treinos</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('TreinoSelecaoScreen')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Verificar Treinos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Água Diária</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('AguaDiaria')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Verificar Água Diária</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Dieta</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('CaloriasDiarias')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Planejamento da Dieta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.option}>
        <Text style={styles.optionTitle}>Cálculos IMC/TMB</Text>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('Calculos')}  // Corrigir nome da tela
        >
          <Text style={styles.optionButtonText}>Ir para Cálculos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1F1F1F',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#333',  // Cor de fundo do cabeçalho
    height: 80,  // Definindo altura do cabeçalho
    marginTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    color: '#6FA15A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  option: {
    marginBottom: 15,
  },
  optionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  optionButton: {
    backgroundColor: '#6FA15A',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carouselContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200,
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

export default TelaSelecao;
