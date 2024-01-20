import axios from "axios";
import { Task } from "../types/Task";

const API = process.env.REACT_APP_API_URL;

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  const res = await axios.get(endpoint(path));
  return res.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const res = await get("/v1/task/");
  return res.data;
};

export const getTask = async (id: string): Promise<Task> => {
  const res = await get(`/v1/task/${id}`);
  return res.data;
};

export const addTask = async (task: Task): Promise<void> => {
  await axios.post(endpoint("/v1/task/"), task);
};

export const updateTask = async (task: Task): Promise<void> => {
  await axios.put(endpoint(`/v1/task/`), task);
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(endpoint(`/v1/task/${id}`));
};
