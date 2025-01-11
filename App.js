// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SelectionProvider } from './src/SelectionContext'; // Importando o contexto

import LoginScreen from './src/LoginScreen'; // Ajuste o caminho se necessário
import RegisterScreen from './src/RegisterScreen'; // Ajuste o caminho se necessário
import HomeScreen from './src/HomeScreen'; // Ajuste o caminho se necessário
import SelecaoScreen from './src/SelecaoScreen'; // Ajuste o caminho se necessário
import UsuarioScreen from './src/UsuarioScreen'; // Ajuste o caminho se necessário
import EditarUsuarioScreen from './src/EditarUsuarioScreen'; // Ajuste o caminho se necessário
import TreinoSelecaoScreen from './src/TreinoSelecaoScreen';
import HipertrofiaScreen from './src/HipertrofiaScreen'; // Crie essa tela se ainda não existir
import ForcaScreen from './src/ForcaScreen'; // Ajuste o caminho se necessário
import PerdaDePesoScreen from './src/PerdaDePesoScreen'; // Ajuste o caminho se necessário
import AguaDiariaScreen from './src/AguaDiariaScreen'; // Ajuste o caminho se necessário
import CaloriasDiariasScreen from './src/CaloriasDiariasScreen'; // Ajuste o caminho se necessário
import CalculosScreen from './src/CalculosScreen'; // Caminho correto para o arquivo
import ResistenciaScreen from './src/ResistenciaScreen'; // Ajuste o caminho conforme necessário
import DetalhesScreen from './src/DetalhesScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SelectionProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Selecao" // Agora a tela inicial é a TelaSelecao
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1F1F1F', // Cor de fundo do cabeçalho para todas as telas
            },
            headerTintColor: '#fff', // Cor do texto e dos ícones no cabeçalho
            headerTitleAlign: 'left', // Alinha o título à esquerda
          }}
        >
          {/* Definindo a navegação entre telas */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Selecao" component={SelecaoScreen} options={{ title: 'Seleção' }} />
          <Stack.Screen name="Detalhes" component={DetalhesScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="UsuarioScreen" component={UsuarioScreen} options={{ title: 'Usuário' }} />
          <Stack.Screen name="EditarUsuarioScreen" component={EditarUsuarioScreen} options={{ title: 'Editar Usuário' }} />
          <Stack.Screen name="ForcaScreen" component={ForcaScreen} options={{ title: 'Treino de Força' }} />
          <Stack.Screen name="HipertrofiaScreen" component={HipertrofiaScreen} options={{ title: 'Treino de Hipertrofia' }} />
          <Stack.Screen name="AguaDiaria" component={AguaDiariaScreen} options={{ title: 'Controle de Água' }} />
          <Stack.Screen name="CaloriasDiarias" component={CaloriasDiariasScreen} options={{ title: 'Planejamento de Dieta' }} />
          <Stack.Screen name="TreinoSelecaoScreen" component={TreinoSelecaoScreen} options={{ title: 'Seleção de Treino' }} />
          <Stack.Screen name="PerdaDePesoScreen" component={PerdaDePesoScreen} options={{ title: 'Treino para Perda de Peso' }} />
          <Stack.Screen name="Calculos" component={CalculosScreen} options={{ title: 'Cálculos IMC/TMB' }} />
          <Stack.Screen name="ResistenciaScreen" component={ResistenciaScreen} options={{ title: 'Treino de Resistência' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SelectionProvider>
  );
};

export default App;
