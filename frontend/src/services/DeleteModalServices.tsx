/* eslint-disable prettier/prettier */
import { del } from '../lib/api';

export const deleteTodo = async (id: number): Promise<void> => {
  return del(`/todos/${id}`);
}; 