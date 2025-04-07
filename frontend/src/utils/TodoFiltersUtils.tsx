import { ITodo } from "../types/TodoTypes";

export const COLORS = [
  '#f44336', // Vermelho
  '#ff9800', // Laranja
  '#ffeb3b', // Amarelo
  '#4caf50', // Verde
  '#2196f3', // Azul
  '#9c27b0', // Roxo
  '#795548', // Marrom
];

export const filterTodosByColor = (todos: ITodo[], color: string | null): ITodo[] => {
  if (!color) return todos;
  return todos.filter(todo => todo.color === color);
};

export const filterTodosByFavorite = (todos: ITodo[], showOnlyFavorites: boolean): ITodo[] => {
  if (!showOnlyFavorites) return todos;
  return todos.filter(todo => todo.isFavorite);
}; 