import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';

// --- AQUI ESTÁ A CORREÇÃO PRINCIPAL ---
// 1. Criamos uma "planta padrão" para o nosso contexto.
//    Ela diz ao sistema quais funções existem, mesmo que comecem vazias.
const defaultValue = {
  tarefas: [],
  loading: false,
  buscarTarefas: async () => {},
  addTarefa: async (texto) => {},
  deletarTarefa: async (id) => {},
  toggleTarefa: async (tarefa) => {},
  updateTarefa: async (id, dados) => {},
};

// 2. Criamos o contexto usando a planta padrão em vez de 'null'.
const TasksContext = createContext(defaultValue);

export function TasksProvider({ children }) {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarTarefas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/tarefas');
      setTarefas(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTarefa = async (texto) => {
    try {
      const response = await api.post('/api/tarefas', { texto, concluida: false });
      setTarefas(tarefasAtuais => [...tarefasAtuais, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      Alert.alert("Erro", "Não foi possível adicionar a tarefa.");
    }
  };

  const deletarTarefa = async (id) => {
    try {
      await api.delete(`/api/tarefas/${id}`);
      setTarefas(tarefasAtuais => tarefasAtuais.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      Alert.alert("Erro", "Não foi possível deletar a tarefa.");
    }
  };

  const updateTarefa = async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/api/tarefas/${id}`, dadosAtualizados);
      setTarefas(tarefasAtuais => tarefasAtuais.map(t => (t.id === id ? response.data : t)));
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
      Alert.alert("Erro", "Não foi possível editar a tarefa.");
    }
  };

  const toggleTarefa = async (tarefa) => {
    await updateTarefa(tarefa.id, { ...tarefa, concluida: !tarefa.concluida });
  };

  const value = {
    tarefas, loading, buscarTarefas, addTarefa, deletarTarefa, toggleTarefa, updateTarefa
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um TasksProvider');
  }
  return context;
}