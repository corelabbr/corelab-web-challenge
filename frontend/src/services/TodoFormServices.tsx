import { post, put } from '../lib/api';
import { ITodo } from '../types/TodoTypes';

export const createTodo = async (todo: Omit<ITodo, 'id' | 'createdAt'>): Promise<ITodo> => {
  return post('/todos', todo);
};

export const updateTodo = async (id: number, todo: Partial<ITodo>): Promise<ITodo> => {
  return put(`/todos/${id}`, todo);
}; 