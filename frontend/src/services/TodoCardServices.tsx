import { put, del } from '../lib/api';
import { ITodo } from '../types/TodoTypes';

export const toggleFavorite = async (id: number, isFavorite: boolean): Promise<ITodo> => {
  return put(`/todos/${id}`, { isFavorite });
};

export const deleteTodo = async (id: number): Promise<void> => {
  return del(`/todos/${id}`);
}; 