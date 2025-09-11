
import React, { createContext, useContext, useState } from 'react';
import 'react-native-get-random-values'; // Import para o UUID
import { v4 as uuidv4 } from 'uuid'; // Biblioteca para gerar IDs únicos


const TAREFAS_INICIAIS = [
  { id: uuidv4(), texto: 'Exemplo de tarefa', concluida: true },
  { id: uuidv4(), texto: 'Exemplo de tarefa 2', concluida: false },
];

const TasksContext = createContext();


export function TasksProvider({ children }) {
  const [tarefas, setTarefas] = useState(TAREFAS_INICIAIS);

  const addTarefa = (texto) => {
    const novaTarefa = {
      id: uuidv4(),
      texto: texto,
      concluida: false,
    };
    setTarefas([...tarefas, novaTarefa]);
  };

  const updateTarefa = (id, novoTexto, statusConcluida) => {
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, texto: novoTexto, concluida: statusConcluida } : t
    ));
  };
  
  const toggleTarefa = (id) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tarefas, addTarefa, updateTarefa, toggleTarefa }}>
      {children}
    </TasksContext.Provider>
  );
}


export function useTasks() {
  return useContext(TasksContext);
}