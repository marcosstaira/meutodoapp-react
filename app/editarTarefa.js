
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useTasks } from './context/TasksContext';

const TelaEditarTarefa = () => {
  // 1. Recebe os parâmetros passados da tela de lista
  const { id, texto, concluida } = useLocalSearchParams();
  const router = useRouter();
  const { updateTarefa } = useTasks();  

  const [novoTexto, setNovoTexto] = useState(texto);

  const handleSalvar = () => {
    if (novoTexto.trim().length > 0) {
 
      updateTarefa(id, novoTexto.trim(), concluida === 'true');
      router.back(); 
    } else {
      alert('O nome da tarefa não pode ficar em branco.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Editando Tarefa
        </Text>

        <TextInput
          label="Nome da Tarefa"
          value={novoTexto}
          onChangeText={setNovoTexto}
          mode="outlined"
          style={styles.input}
          autoFocus={true}
        />

        <Button mode="contained" onPress={handleSalvar} style={styles.button}>
          Salvar Alterações
        </Button>

        <Button mode="text" onPress={() => router.back()}>
          Cancelar
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    content: {
      padding: 24,
    },
    title: {
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      marginBottom: 16,
    },
    button: {
      paddingVertical: 4,
    },
  });


export default TelaEditarTarefa;