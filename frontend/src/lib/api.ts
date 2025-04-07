import axios from 'axios';

const API = "http://localhost:3003";

const api = axios.create({
  baseURL: API,
});

const endpoint = (path: string): string => API + path;

export const get = async (path: string): Promise<any> => {
  const response = await api.get(path);
  return response.data;
};

export const post = async (path: string, data: any): Promise<any> => {
  const response = await api.post(path, data);
  return response.data;
};

export const put = async (path: string, data: any): Promise<any> => {
  const response = await api.put(path, data);
  return response.data;
};

export const del = async (path: string): Promise<any> => {
  const response = await api.delete(path);
  return response.data;
};

export { api };
