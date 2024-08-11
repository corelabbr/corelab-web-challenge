import { create } from "zustand";
import { TodoEntity } from "../shared/types/TodoEntity";
import { todo } from "node:test";

export type State = {
  storeTodos: TodoEntity[];
  otherTodos: TodoEntity[];
  searchedTodos: TodoEntity[];
  favoriteTodos: TodoEntity[];
  apiCallQuantity: number;
};

export type Actions = {
  setStoreTodos: (todos: TodoEntity[]) => void;
  getTodos: () => TodoEntity[];
  filter: () => void;
  updateStoreTodos: (todos: TodoEntity[]) => void;
  unfavoriteTodo: (id: number) => void;
  favoriteTodo: (id: number) => void;
  createStoreTodo: (todo: TodoEntity) => void;
  deleteStoreTodo: (id: number) => void;
  increaseApiCallQuantity: () => void;
  setSearchedTodos: (todos: TodoEntity[]) => void;
};

export const useTodoStore = create<State & Actions>((set, get) => ({
  storeTodos: [],
  otherTodos: [],
  favoriteTodos: [],
  apiCallQuantity: 0,
  searchedTodos: [],

  setSearchedTodos: (todos) => {
    set(() => ({
      searchedTodos: todos,
    }));
  },

  setStoreTodos: (todos) => {
    set(() => ({ storeTodos: todos }));
    get().filter();
  },

  getTodos: () => get().storeTodos,

  updateStoreTodos: (todos) => {
    set((state) => ({ storeTodos: [...state.storeTodos, ...todos] }));
    get().filter();
  },

  createStoreTodo: (todo) => {
    set((state) => ({ storeTodos: [todo, ...state.storeTodos] }));
    get().filter();
  },

  deleteStoreTodo: (id) => {
    const filteredTodoArray = get().storeTodos.filter((t) => t.id !== id);
    set(() => ({ storeTodos: filteredTodoArray }));
    get().filter();
  },

  favoriteTodo: (id: number) => {
    const foundIndex = get().otherTodos.findIndex((t) => t.id === id);

    get().otherTodos[foundIndex].favorite = true;
    get().filter();
  },

  increaseApiCallQuantity: () =>
    set((state) => ({
      apiCallQuantity: state.apiCallQuantity + 1,
    })),

  unfavoriteTodo: (id: number) => {
    const foundIndex = get().favoriteTodos.findIndex((t) => t.id === id);
    get().favoriteTodos[foundIndex].favorite = false;
    get().filter();
  },

  filter: () => {
    const favs: TodoEntity[] = [];
    const others: TodoEntity[] = [];

    console.log()

    get().storeTodos.forEach((t) => {
      if (t.favorite) favs.push(t);
      else others.push(t);
    });

    set(() => ({
      favoriteTodos: favs,
      otherTodos: others,
    }));
  },
}));
