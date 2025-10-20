import { useFocusEffect, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, FAB, IconButton, useTheme } from 'react-native-paper';
import { useTasks } from '../../context/TasksContext';

const TelaListaTarefas = () => {
  const { tarefas, loading, buscarTarefas, toggleTarefa, deletarTarefa } = useTasks();
  const router = useRouter();
  const theme = useTheme();
  
  
  useFocusEffect(
    React.useCallback(() => {
      buscarTarefas();
    }, [])
  );

  const confirmarDelecao = (id) => {
    Alert.alert(
      "Confirmar Deleção", "Deseja apagar esta tarefa?",
      [{ text: "Cancelar", style: "cancel" }, { text: "Apagar", onPress: () => deletarTarefa(id), style: "destructive" }]
    );
  };

  
  if (loading) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
      </View>
    );
  }

  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Checkbox status={item.concluida ? 'checked' : 'unchecked'} onPress={() => toggleTarefa(item)} />
      <TouchableOpacity 
        style={{ flex: 1 }} 
        onPress={() => router.push({ pathname: '/editarTarefa', params: { id: item.id, texto: item.texto, concluida: item.concluida } })}
      >
        <Text style={[styles.itemText, item.concluida && styles.textoConcluido]}>{item.texto}</Text>
      </TouchableOpacity>
      <View style={styles.actionsContainer}>
        <IconButton
          icon="pencil-outline"
          size={24}
          onPress={() => router.push({ pathname: '/editarTarefa', params: { id: item.id, texto: item.texto, concluida: item.concluida } })}
        />
        <IconButton
          icon="trash-can-outline"
          iconColor={theme.colors.error}
          size={24}
          onPress={() => confirmarDelecao(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={() => <Text style={styles.listaVazia}>Nenhuma tarefa ainda. Adicione uma!</Text>}
      />
      <FAB
        icon="plus" style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/criarTarefa')} color="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  containerCarregando: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
  listaVazia: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
  itemContainer: { flexDirection: 'row', alignItems: 'center', paddingLeft: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText: { flex: 1, fontSize: 16, paddingVertical: 20, paddingHorizontal: 10 },
  textoConcluido: { textDecorationLine: 'line-through', color: 'gray' },
  actionsContainer: { flexDirection: 'row' }
});

export default TelaListaTarefas;