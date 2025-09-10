import { useState, useEffect } from "react";
import { taskService } from "../services/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  color: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TaskData {
  title: string;
  description: string;
  color?: string;
  isFavorite?: boolean;
}

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (taskData: TaskData) => Promise<void>;
  updateTask: (id: string, taskData: Partial<TaskData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reload: () => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError("Erro ao carregar as tarefas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: TaskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      setError("Erro ao criar tarefa");
      console.error(err);
    }
  };

  const updateTask = async (id: string, taskData: Partial<TaskData>) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError("Erro ao atualizar tarefa");
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;
    try {
      await taskService.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError("Erro ao excluir tarefa");
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return { tasks, loading, error, addTask, updateTask, deleteTask, reload: loadTasks };
}
