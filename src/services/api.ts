import axios from "axios";
import { type Task } from "../types/Task";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

const handleError = (error: any, context: string) => {
  console.error(`API Error in ${context}:`, error);
  const message =
    error.response?.data?.error || error.message || "Failed to fetch data";
  throw new Error(message);
};

export const taskService = {
  // GET ALL (filtered)
  getAllTasks: async (filters?: { favorite?: boolean; color?: number }) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        params: filters,
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            error.response.data.error ||
              `Erro ${error.response.status}: ${error.response.statusText}`
          );
        } else if (error.request) {
          throw new Error(
            "Erro de conexão. Verifique se o servidor está rodando."
          );
        } else {
          throw new Error("Erro na requisição: " + error.message);
        }
      }
      throw error;
    }
  },

  // CREATE task
  createTask: async (taskData: any) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.error ||
            `Erro ao criar task: ${error.response.status}`
        );
      }
      throw new Error("Erro ao criar task");
    }
  },

  // UPDATE task
  updateTask: async (id: string, taskData: Partial<Task>): Promise<Task> => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data;
    } catch (error) {
      return handleError(error, "updateTask");
    }
  },

  // DELETE task
  deleteTask: async (id: string): Promise<void> => {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      handleError(error, "deleteTask");
      throw error;
    }
  },
};
