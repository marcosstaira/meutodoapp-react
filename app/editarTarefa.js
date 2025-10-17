import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useTasks } from '../context/TasksContext';

const TelaEditarTarefa = () => {
  const { id, texto, concluida } = useLocalSearchParams();
  const { updateTarefa } = useTasks();
  const router = useRouter();
  const [novoTexto, setNovoTexto] = useState(texto);
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (novoTexto.trim().length === 0) {
      Alert.alert('Atenção', 'O nome da tarefa não pode ficar em branco.');
      return;
    }
    setLoading(true);
    try {
      await updateTarefa(id, { texto: novoTexto.trim(), concluida: concluida === 'true' });
      router.back();
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>Editando Tarefa</Text>
        <TextInput label="Nome da Tarefa" value={novoTexto} onChangeText={setNovoTexto} mode="outlined" style={styles.input} autoFocus={true} />
        <Button mode="contained" onPress={handleSalvar} style={styles.button} loading={loading} disabled={loading}>Salvar Alterações</Button>
        <Button mode="text" onPress={() => router.back()} disabled={loading}>Cancelar</Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    content: { padding: 24 },
    title: { marginBottom: 24, textAlign: 'center' },
    input: { marginBottom: 16 },
    button: { paddingVertical: 4 },
});

export default TelaEditarTarefa;