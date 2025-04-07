import { ITodo } from './TodoTypes';

export interface TodoFormProps {
  todo?: ITodo;
  onSave: (todo: Omit<ITodo, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
} 