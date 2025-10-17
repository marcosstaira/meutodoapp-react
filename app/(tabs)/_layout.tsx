import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import { useTasks } from '../../context/TasksContext'; // 1. Importe o useTasks
import api from '../../services/api';
import { getToken } from '../../storage';

export default function TabsLayout() {
  const theme = useTheme();
  const { buscarTarefas } = useTasks(); // 2. Pegue a função de buscar tarefas

  useEffect(() => {
    const carregarDadosIniciais = async () => {
      const token = await getToken();
      if (token) {
        // 3. Primeiro, configura o token no axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // 4. SÓ DEPOIS, chama a função para buscar as tarefas
        buscarTarefas();
      }
    };

    carregarDadosIniciais();
  }, []); // Roda apenas uma vez quando o usuário entra na área logada

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="lista"
        options={{
          title: 'Tarefas',
          headerTitle: 'Minhas Tarefas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          headerTitle: 'Meu Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}