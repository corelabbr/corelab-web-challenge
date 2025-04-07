import { ITodo } from "../types/TodoTypes";
import * as TodoCardServices from "../services/TodoCardServices";

export const toggleTodoFavorite = async (id: number, isFavorite: boolean): Promise<ITodo> => {
  return TodoCardServices.toggleFavorite(id, isFavorite);
};

export const removeExistingTodo = async (id: number): Promise<void> => {
  return TodoCardServices.deleteTodo(id);
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}; 