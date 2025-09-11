import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { Checkbox, FAB, IconButton, List, useTheme } from 'react-native-paper';
import { useTasks } from '../context/TasksContext';

const TelaListaTarefas = () => {
  const { tarefas, toggleTarefa } = useTasks(); 
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.texto}
            titleStyle={item.concluida ? styles.textoConcluido : null}
            onPress={() => router.push({ pathname: '/editarTarefa', params: { id: item.id, texto: item.texto, concluida: item.concluida } })}
            left={() => (
              <Checkbox
                status={item.concluida ? 'checked' : 'unchecked'}
                onPress={() => toggleTarefa(item.id)}
              />
            )}
            right={() => <IconButton icon="pencil-outline" onPress={() => router.push({ pathname: '/editarTarefa', params: { id: item.id, texto: item.texto, concluida: item.concluida } })} />}
          />
        )}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/criarTarefa')}
        color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  textoConcluido: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TelaListaTarefas;