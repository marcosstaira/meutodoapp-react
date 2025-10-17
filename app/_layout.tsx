import { Stack } from 'expo-router';
import { TasksProvider } from '../context/TasksContext';

export default function RootLayout() {
  return (
  
    <TasksProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="criarTarefa" options={{ presentation: 'modal', title: 'Nova Tarefa' }} />
        <Stack.Screen name="editarTarefa" options={{ presentation: 'modal', title: 'Editar Tarefa' }} />
        <Stack.Screen name="registrar" options={{ title: 'Criar Conta', headerShown: false }} />
      </Stack>
    </TasksProvider>
  );
}