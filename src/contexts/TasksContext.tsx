import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { del, get, post, put } from "../services/api";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isFavorite: boolean;
  color: string;
}

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  page: number;
  fetchTasks: (page?: number, limit?: number, search?: string) => Promise<void>;
  createTask: (data: Omit<Task, "id">) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  favoriteTask: (id: string) => Promise<void>;
  changeTaskStatus: (id: string) => Promise<void>;
  changeTaskColor: (id: string, color: string) => Promise<void>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTasks();
  }, [page]);

  // Função para buscar tarefas com paginação e busca
  const fetchTasks = async (page = 1, limit = 10, search = "") => {
    setLoading(true);
    try {
      const url = `/tasks?page=${page}&limit=${limit}&search=${search}`;
      const response = await get(url);
      // console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error("Erro desconhecido ao buscar tarefas");
        setError("Erro desconhecido ao buscar tarefas");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para criar uma nova tarefa
  const createTask = async (data: Omit<Task, "id">) => {
    setLoading(true);
    if (!data.title) {
      setError("Título é obrigatório");
      setLoading(false);
      return;
    }
    if (!data.description) {
      setError("Descrição é obrigatória");
      setLoading(false);
      return;
    }

    try {
      const newTask = await post("/tasks", data);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Erro desconhecido ao criar tarefa");
        setError("Erro desconhecido ao criar tarefa");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar uma tarefa
  const updateTask = async (id: string, data: Partial<Task>) => {
    setLoading(true);
    try {
      const updatedTask = await put(`/tasks/${id}`, data);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Erro desconhecido ao atualizar tarefa");
        setError("Erro desconhecido ao atualizar tarefa");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para deletar uma tarefa
  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      await del(`/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        // setError(err.message);
      } else {
        console.error("Erro desconhecido ao deletar tarefa");
        // setError("Erro desconhecido ao deletar tarefa");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para marcar/desmarcar como favorito
  const favoriteTask = async (id: string) => {
    setLoading(true);
    try {
      const updatedTask = await put(`/tasks/${id}/toggleFavorite`, {});
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Erro desconhecido ao favoritar tarefa");
        setError("Erro desconhecido ao favoritar tarefa");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para alterar o status de conclusão
  const changeTaskStatus = async (id: string) => {
    setLoading(true);
    try {
      const updatedTask = await put(`/tasks/${id}/status`, {});
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Erro desconhecido ao alterar status da tarefa");
        setError("Erro desconhecido ao alterar status da tarefa");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para alterar a cor da tarefa
  const changeTaskColor = async (id: string, color: string) => {
    setLoading(true);
    try {
      const updatedTask = await put(`/tasks/${id}`, { color });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message);
      } else {
        console.error("Erro desconhecido ao alterar cor da tarefa");
        setError("Erro desconhecido ao alterar cor da tarefa");
      }
    } finally {
      setLoading(false);
    }
  };

  // Valor do contexto
  const value = {
    tasks,
    loading,
    error,
    page,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    favoriteTask,
    changeTaskStatus,
    changeTaskColor,
    setPage,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
