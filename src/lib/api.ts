import { ITask } from '../types/Task';
const API = 'http://localhost:3333';

const endpoint = (path: string): string => API + path;

const request = async (path: string, method: string, body?: any): Promise<any> => {
  return fetch(endpoint(path), {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then((res) => (res.status === 204 ? null : res.json()));
};

const get = (path: string) => request(path, 'GET');
const post = (path: string, body: any) => request(path, 'POST', body);
const put = (path: string, body: any) => request(path, 'PUT', body);
const del = (path: string) => request(path, 'DELETE');

export const getTasks = async () => get('/tasks');
export const createTask = async (task: Partial<ITask>) => post('/tasks', task);
export const updateTask = async (id: number, task: Partial<ITask>) => put(`/tasks/${id}`, task);
export const deleteTask = async (id: number) => del(`/tasks/${id}`);
