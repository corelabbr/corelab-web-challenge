import axios from 'axios';

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

interface TaskFilters {
  favorite?: boolean;
  color?: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  
  getAllTasks: async (filters: TaskFilters = {}): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (filters.favorite) params.append('favorite', 'true');
    if (filters.color) params.append('color', filters.color);
    
    const response = await api.get(`/task?${params.toString()}`);
    return response.data;
  },

  
  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/task/${id}`);
    return response.data;
  },


  createTask: async (taskData: TaskData): Promise<Task> => {
    const response = await api.post('/task', taskData);
    return response.data;
  },

 
  updateTask: async (id: string, taskData: Partial<TaskData>): Promise<Task> => {
    const response = await api.put(`/task/${id}`, taskData);
    return response.data;
  },


  deleteTask: async (id: string): Promise<void> => {
    const response = await api.delete(`/task/${id}`);
    return response.data;
  },
};

export default api;

