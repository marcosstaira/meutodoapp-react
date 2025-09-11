import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useTasks } from './context/TasksContext';

const TelaCriarTarefa = () => {
  const [textoTarefa, setTextoTarefa] = useState('');
  const router = useRouter();
  const { addTarefa } = useTasks(); 

  const handleSalvar = () => {
    if (textoTarefa.trim().length > 0) {
      addTarefa(textoTarefa.trim()); 
      router.back();
    } else {
      alert('Por favor, digite o nome da tarefa.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          O que você precisa fazer?
        </Text>
        <TextInput
          label="Nome da Tarefa"
          value={textoTarefa}
          onChangeText={setTextoTarefa}
          mode="outlined"
          style={styles.input}
          autoFocus={true}
        />
        <Button mode="contained" onPress={handleSalvar} style={styles.button}>
          Salvar Tarefa
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

export default TelaCriarTarefa;