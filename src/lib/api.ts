import type { ICreateTodo, ITodo } from '../types/Todo';
import axios from 'axios';

const API = process.env.REACT_APP_API || 'http://localhost:3333';

const endpoint = (path: string): string => API + path;

// HTTP METHODS FUNCTIONS
const get = async (path: string) => {
  return axios(endpoint(path)).then((res) => res.data);
};

const post = async (path: string, todo: ICreateTodo) => {
  return axios
    .post(endpoint(path), {
      ...todo,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.data;
    });
};

const put = async (path: string, todo: ICreateTodo): Promise<ITodo> => {
  return axios
    .put(endpoint(path), {
      ...todo,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.data;
    });
};

const patch = async (path: string, data: { is_favorite: boolean }): Promise<ITodo> => {
  return axios
    .put(endpoint(path), {
      ...data,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => {
      return res.data;
    });
};

const destroy = async (path: string): Promise<void> => {
  return axios.delete(endpoint(path)).then();
};

//API CALLS FUNCTIONS

export const getTodos = async () => {
  return get('/todos');
};

export const createTodos = async (data: ICreateTodo) => {
  return post('/todos', data);
};

export const updateTodos = async (data: ITodo): Promise<ITodo> => {
  return put(`/todos/${data.id}`, data);
};

export const favoriteUnfavoriteTodo = async (id: number, favorite: { is_favorite: boolean }) => {
  return await patch(`/todos/${id}`, favorite);
};

export const deleteTodo = async (id: number) => {
  return await destroy(`/todos/${id}`);
};
