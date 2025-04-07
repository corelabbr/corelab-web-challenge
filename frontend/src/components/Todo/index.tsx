/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { ITodo } from '../../types/TodoTypes';
import TodoCard from '../TodoCard';
import TodoFilters from '../TodoFilters';
import TodoForm from '../TodoForm';
import SearchBar from '../SearchBar';
import * as TodoUtils from '../../utils/TodoUtils';
import * as TodoCardUtils from '../../utils/TodoCardUtils';
import * as TodoFormUtils from '../../utils/TodoFormUtils';
import * as TodoFiltersUtils from '../../utils/TodoFiltersUtils';
import { useTodos, invalidateTodosCache } from '../../services/TodoServices';
import '../../styles/TodoStyles.scss';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Todo: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: todosData, isLoading, isError, error } = useTodos();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<ITodo | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Atualizar o estado local quando os dados do React Query forem carregados
  useEffect(() => {
    if (todosData) {
      setTodos(todosData);
    }
  }, [todosData]);

  // Aplicar filtros
  useEffect(() => {
    let result = [...todos];
    
    // Ordenar favoritos primeiro
    result = TodoUtils.sortTodosByFavorite(result);
    
    // Filtrar por cor
    if (selectedColor) {
      result = TodoFiltersUtils.filterTodosByColor(result, selectedColor);
    }
    
    // Filtrar por favoritos
    if (showOnlyFavorites) {
      result = TodoFiltersUtils.filterTodosByFavorite(result, showOnlyFavorites);
    }
    
    // Filtrar por pesquisa
    if (searchQuery) {
      result = result.filter(
        todo => 
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredTodos(result);
  }, [todos, selectedColor, showOnlyFavorites, searchQuery]);

  // Aplicar tema ao body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const handleToggleFavorite = async (id: number, isFavorite: boolean) => {
    try {
      const updatedTodo = await TodoCardUtils.toggleTodoFavorite(id, isFavorite);
      setTodos(prev => prev.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  const handleEdit = (todo: ITodo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await TodoCardUtils.removeExistingTodo(id);
      // Atualizar o cache do React Query
      queryClient.setQueryData(['todos'], (oldData: ITodo[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(todo => todo.id !== id);
      });
      // Invalidar o cache para forçar uma nova busca
      invalidateTodosCache(queryClient);
      // Atualizar o estado local
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleSave = async (todoData: Omit<ITodo, 'id' | 'createdAt'>) => {
    try {
      if (currentTodo) {
        // Atualizar tarefa existente
        const updatedTodo = await TodoFormUtils.updateExistingTodo(currentTodo.id, todoData);
        
        // Atualizar o cache do React Query
        queryClient.setQueryData(['todos'], (oldData: ITodo[] | undefined) => {
          if (!oldData) return [];
          return oldData.map(todo => todo.id === currentTodo.id ? updatedTodo : todo);
        });
        
        // Invalidar o cache para forçar uma nova busca
        invalidateTodosCache(queryClient);
        
        // Atualizar o estado local
        setTodos(prev => prev.map(todo => todo.id === currentTodo.id ? updatedTodo : todo));
      } else {
        // Criar nova tarefa
        const newTodo = await TodoFormUtils.createNewTodo(todoData);
        
        // Atualizar o cache do React Query
        queryClient.setQueryData(['todos'], (oldData: ITodo[] | undefined) => {
          if (!oldData) return [newTodo];
          return [...oldData, newTodo];
        });
        
        // Invalidar o cache para forçar uma nova busca
        invalidateTodosCache(queryClient);
        
        // Atualizar o estado local
        setTodos(prev => [...prev, newTodo]);
      }
      
      setIsModalOpen(false);
      setCurrentTodo(undefined);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
    }
  };

  const handleToggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }

  if (isError) {
    return <div className="error">Erro ao carregar tarefas: {error?.message}</div>;
  }

  return (
    <div className="todo-app">
      <div className="todo-app__header">
        <h1>To-Do List</h1>
        <button className="theme-toggle" onClick={handleToggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="todo-app__actions">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Pesquisar tarefas..."
        />
        <button 
          className="add-button"
          onClick={() => {
            setCurrentTodo(undefined);
            setIsModalOpen(true);
          }}
        >
          <span className="plus-icon">+</span> Add New Task
        </button>
      </div>

      <div className="todo-app__content">
        <TodoFilters
          selectedColor={selectedColor}
          showOnlyFavorites={showOnlyFavorites}
          onColorSelect={setSelectedColor}
          onFavoriteToggle={setShowOnlyFavorites}
        />

        <div className="todo-app__list">
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onToggleFavorite={handleToggleFavorite}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p style={{ color: 'var(--text-primary)', textAlign: 'center' }}>
              Nenhuma tarefa encontrada.
            </p>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <h2>{currentTodo ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <TodoForm
              todo={currentTodo}
              onSave={handleSave}
              onCancel={() => {
                setIsModalOpen(false);
                setCurrentTodo(undefined);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo; 