/* eslint-disable prettier/prettier */
import * as DeleteModalServices from '../services/DeleteModalServices';

export const removeTodo = async (id: number): Promise<void> => {
  return DeleteModalServices.deleteTodo(id);
}; 