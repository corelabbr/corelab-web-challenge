import { create } from 'zustand';
import { ITodo } from './types/Todo';
import { createTodos, deleteTodo, favoriteUnfavoriteTodo, getTodos, updateTodos } from './lib/api';
import { toast } from 'react-toastify';

interface ITodoStore {
  todos: ITodo[];
  displayedTodos: ITodo[];
  getTodos: () => Promise<void>;
  addTodo: (todo: ITodo) => Promise<boolean>;
  changeColor: (id: number, newColor: string) => void;
  updateTodo: (todo: ITodo) => Promise<boolean>;
  deleteTodo: (id: number) => Promise<void>;
  favoriteTodo: (id: number, is_favorite: { is_favorite: boolean }) => void;
  filterBySearch: (search: string) => void;
  filterByFavorite: (favorite: boolean) => void;
  filterByColor: (color: string) => void;
  resetFilters: () => void;
}

//Fetch todos and create a copy of the todos to be displayed, updating only the displayed todos and minimizing APi calls

export const useTodoStore = create<ITodoStore>((set) => ({
  todos: [],
  displayedTodos: [],

  getTodos: async () => {
    try {
      const fetchedTodos = await getTodos();
      set({ todos: fetchedTodos, displayedTodos: fetchedTodos });
    } catch (error) {
      toast.error('Erro! Não foi possível conectar com o servidor');
    }
  },

  addTodo: async (todo) => {
    try {
      const newTodo = await createTodos(todo);
      set((state) => ({
        todos: [newTodo, ...state.todos],
        displayedTodos: [newTodo, ...state.todos],
      }));
      toast.success('Nota criada com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro! A nota não pôde ser criada');
      return false;
    }
  },

  updateTodo: async (todo) => {
    try {
      const updatedTodo = await updateTodos(todo);
      set((state) => {
        const updatedTodos = state.todos.map((t) => (todo.id === t.id ? updatedTodo : t));
        return { todos: updatedTodos, displayedTodos: updatedTodos };
      });
      toast.success('Nota atualizada com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro! A nota não pôde ser criada');
      return false;
    }
  },

  changeColor: (id, newColor) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, color: newColor } : todo
      );
      return {
        todos: updatedTodos,
        displayedTodos: updatedTodos,
      };
    });
  },

  deleteTodo: async (id: number) => {
    try {
      await deleteTodo(id);
      set((state) => {
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        return { todos: updatedTodos, displayedTodos: updatedTodos };
      });
      toast.success('Nota excluída com sucesso');
    } catch (error) {
      toast.error('Erro! A Nota não pôde ser excluída');
    }
  },

  favoriteTodo: async (id: number, is_favorite) => {
    const updatedTodo = await favoriteUnfavoriteTodo(id, is_favorite);

    set((state) => {
      const updatedTodos = state.todos.map((todo) => (todo.id === id ? updatedTodo : todo));
      return { todos: updatedTodos, displayedTodos: updatedTodos };
    });
  },

  filterBySearch: (search: string) => {
    set((state) => {
      const filteredTodos = state.todos.filter((todo) => {
        if (
          todo.title.toLowerCase().includes(search.toLowerCase()) ||
          todo.content.toLowerCase().includes(search.toLowerCase())
        )
          return true;

        return false;
      });

      return {
        displayedTodos: filteredTodos,
      };
    });
  },

  filterByFavorite: (favorite: boolean) => {
    set((state) => ({
      displayedTodos: state.todos.filter((todo) => todo.is_favorite === favorite),
    }));
  },

  filterByColor: (color: string) => {
    set((state) => ({
      displayedTodos: state.todos.filter((todo) => todo.color === color),
    }));
  },

  resetFilters: () => {
    set((state) => ({ displayedTodos: state.todos }));
  },
}));
