import axios from 'axios';
// Importe o novo enum TaskStatus
import { Task, CreateTaskDto, UpdateTaskDto, TaskFilters, TaskStatus } from '@/types/task';

// Usa URL absoluta se definida (Docker/browser -> host), senão mantém rewrite relativo
const envBase = process.env.NEXT_PUBLIC_API_URL;
const normalizedBase = envBase
  ? (envBase.endsWith('/api/v1')
      ? envBase
      : `${envBase.replace(/\/$/, '')}/api/v1`)
  : '/api/v1';

const api = axios.create({
  baseURL: normalizedBase,
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const taskService = {
  // Atualize os filtros para usar 'status'
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const params = new URLSearchParams();
    
    if (filters?.status) {
      params.append('status', filters.status);
    }
    if (filters?.isFavorite !== undefined) {
      params.append('isFavorite', String(filters.isFavorite));
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    
    // A rota no backend retorna um objeto { tasks: [], ... }
    // Precisamos extrair o array de tarefas
    const response = await api.get<{ tasks: Task[] }>(`/tasks?${params.toString()}`);
    return response.data.tasks;
  },

  // Get task by ID
  async getTaskById(id: string): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  async createTask(data: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },

  // Update task
  async updateTask(id: string, data: UpdateTaskDto): Promise<Task> {
    const response = await api.patch<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  // Delete task
  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  // Toggle task completion
  async toggleTaskCompletion(id: string, currentStatus: TaskStatus): Promise<Task> {
    const newStatus = currentStatus === TaskStatus.COMPLETED ? TaskStatus.PENDING : TaskStatus.COMPLETED;
    return this.updateTask(id, { status: newStatus });
  },

  // Toggle task favorite
  async toggleTaskFavorite(id: string, isFavorite: boolean): Promise<Task> {
    return this.updateTask(id, { isFavorite });
  },
};

export default api;
