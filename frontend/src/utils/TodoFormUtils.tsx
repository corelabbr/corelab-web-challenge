import { useState, useEffect } from 'react';
import { ITodo } from "../types/TodoTypes";
import * as TodoFormServices from "../services/TodoFormServices";

export const COLORS = [
  '#f44336', // Vermelho
  '#ff9800', // Laranja
  '#ffeb3b', // Amarelo
  '#4caf50', // Verde
  '#2196f3', // Azul
  '#9c27b0', // Roxo
  '#795548', // Marrom
];

export const useTodoForm = (todo?: ITodo) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setColor(todo.color);
      setIsFavorite(todo.isFavorite);
    }
  }, [todo]);

  const handleSubmit = (e: React.FormEvent, onSave: (todo: Omit<ITodo, 'id' | 'createdAt'>) => void) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('O título é obrigatório!');
      return;
    }
    
    onSave({
      title,
      description,
      color,
      isFavorite,
    });
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    isFavorite,
    setIsFavorite,
    handleSubmit
  };
};

export const createNewTodo = async (todo: Omit<ITodo, 'id' | 'createdAt'>): Promise<ITodo> => {
  return TodoFormServices.createTodo(todo);
};

export const updateExistingTodo = async (id: number, todo: Partial<ITodo>): Promise<ITodo> => {
  return TodoFormServices.updateTodo(id, todo);
}; 