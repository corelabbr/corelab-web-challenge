import { ITodo } from "../types/TodoTypes";
import * as TodoServices from "../services/TodoServices";

export const sortTodosByFavorite = (todos: ITodo[]): ITodo[] => {
  return [...todos].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });
};

export const fetchTodos = async (): Promise<ITodo[]> => {
  return TodoServices.getTodos();
}; 