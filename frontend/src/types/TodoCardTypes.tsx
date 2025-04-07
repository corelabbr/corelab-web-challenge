import { ITodo } from './TodoTypes';

export interface TodoCardProps {
  todo: ITodo;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
  onEdit: (todo: ITodo) => void;
  onDelete: (id: number) => void;
} 