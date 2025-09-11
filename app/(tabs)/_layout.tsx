import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function TabsLayout() {
  const theme = useTheme(); // Acessa as cores do tema do Paper

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary, // Cor do ícone ativo
        tabBarInactiveTintColor: 'gray', // Cor do ícone inativo
      }}
    >
      <Tabs.Screen
        name="lista" // Corresponde ao arquivo app/(tabs)/lista.js
        options={{
          title: 'Tarefas', // Texto na aba
          headerTitle: 'Minhas Tarefas', // Texto no cabeçalho
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil" // Corresponde ao arquivo app/(tabs)/perfil.js
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