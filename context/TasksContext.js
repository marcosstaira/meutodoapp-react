import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import api from '../services/api';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FUNÇÃO DELETAR COM DEBUG ---
  const deletarTarefa = async (id) => {
    console.log(`--- DELETE: 1. Tentando deletar tarefa com ID: ${id} ---`);
    try {
      // Faz a chamada DELETE para a API
      const response = await api.delete(`/api/tarefas/${id}`);
      
      console.log("--- DELETE: 2. Sucesso! Resposta da API:", response.status, response.statusText);

      // ATUALIZA A TELA: Remove a tarefa da lista local pelo ID.
      setTarefas(tarefasAtuais => tarefasAtuais.filter(tarefa => tarefa.id !== id));
      
      console.log("--- DELETE: 3. Tarefa removida do estado local! ---");

    } catch (error) {
      // Se a chamada falhar, o código entrará aqui
      console.error("--- ERRO AO DELETAR TAREFA ---");
      if (error.response) {
        console.error("Dados do Erro:", error.response.data);
        console.error("Status do Erro:", error.response.status);
      } else if (error.request) {
        console.error("Erro de Requisição:", error.request);
      } else {
        console.error('Erro na Configuração:', error.message);
      }
      Alert.alert("Erro", "Não foi possível deletar a tarefa. Verifique o console.");
    }
  };



const buscarTarefas = async () => {
    setLoading(true); // Liga a animação de "carregando"
    try {
      const response = await api.get('/api/tarefas');
      setTarefas(response.data); // Atualiza o estado com as tarefas da API
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      Alert.alert("Erro", "Não foi possível carregar suas tarefas.");
    } finally {
      // Este bloco roda SEMPRE, garantindo que a animação seja desligada
      setLoading(false);
    }
  };

  const addTarefa = async (texto) => {
    try {
      const response = await api.post('/api/tarefas', { texto, concluida: false });
      setTarefas(tarefasAtuais => [...tarefasAtuais, response.data]);
    } catch (error) { console.error("Erro ao adicionar tarefa:", error); Alert.alert("Erro", "Não foi possível adicionar a tarefa."); }
  };

  const updateTarefa = async (id, dadosAtualizados) => {
    try {
      const response = await api.put(`/api/tarefas/${id}`, dadosAtualizados);
      setTarefas(tarefasAtuais => tarefasAtuais.map(t => (t.id === id ? response.data : t)));
    } catch (error) { console.error("Erro ao editar tarefa:", error); Alert.alert("Erro", "Não foi possível editar a tarefa."); }
  };
  
  const toggleTarefa = async (tarefa) => {
    await updateTarefa(tarefa.id, { ...tarefa, concluida: !tarefa.concluida });
  };

  const value = { tarefas, loading, buscarTarefas, addTarefa, deletarTarefa, toggleTarefa, updateTarefa };

  return ( <TasksContext.Provider value={value}> {children} </TasksContext.Provider> );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined || context === null) {
    throw new Error('useTasks deve ser usado dentro de um TasksProvider');
  }
  return context;
}