import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { useTheme } from 'react-native-paper';
import api from '../../services/api';
import { getToken } from '../../storage';

export default function TabsLayout() {
  const theme = useTheme();

  useEffect(() => {
    
    const carregarToken = async () => {
      const token = await getToken();
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
    };

    carregarToken();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="lista"
        options={{ title: 'Tarefas', headerTitle: 'Minhas Tarefas', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="format-list-checks" color={color} size={size} />) }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', headerTitle: 'Meu Perfil', tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-circle-outline" color={color} size={size} />) }}
      />
    </Tabs>
  );
}