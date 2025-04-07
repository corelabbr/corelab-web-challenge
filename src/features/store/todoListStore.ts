import { create } from "zustand";
import { TodoListInterface } from "@/types/todo_list_type";

const useTodoListStore = create<{
  todoList: TodoListInterface[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTodoList: (lists: TodoListInterface[]) => void;
  deleteNote: (id: number) => void;
}>((set, get) => ({
  todoList: [],
  loading: true,
  setLoading: (loading: boolean) => set({ loading }),
  setTodoList: (lists: TodoListInterface[]) => set({ todoList: lists }),
  deleteNote: (id: number) => set({ todoList: get().todoList.filter((note) => note.id !== id) }),
}));

export default useTodoListStore;
