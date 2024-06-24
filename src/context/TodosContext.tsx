import React, { createContext, useContext, useState, ReactNode } from "react";
import { CardProps } from "@/types/CardProps";
import api from "@/services/api";
import { CustomColorKey } from "@/utils/customColors";

interface TodosContextProps {
  todos: CardProps[];
  editingIndex: number | null;
  openColorPickerIndex: number | null;
  handleColorPickerToggle: (index: number | null) => void;
  handleEditToggle: (index: number | null) => void;
  handleTitleChange: (index: number, newTitle: string) => void;
  handleDescriptionChange: (index: number, newDescription: string) => void;
  handleFavoriteToggle: (index: number) => void;
  handleColorSelect: (index: number, color: CustomColorKey) => void;
  fetchTodos: () => void;
  handleDeleteTodo: (id: number) => void;
  handleCreateTodo: (
    title: string,
    description: string,
    favorite: boolean
  ) => void;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos deve ser usado com provider");
  }
  return context;
};

interface TodosProviderProps {
  children: ReactNode;
}

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [openColorPickerIndex, setOpenColorPickerIndex] = useState<
    number | null
  >(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [todos, setTodos] = useState<CardProps[]>([]);
  const [originalTodos, setOriginalTodos] = useState<CardProps[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await api.get("/todos");
      setTodos(response.data);
      setOriginalTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar todos:", error);
    }
  };

  const handleColorPickerToggle = (index: number | null) => {
    setOpenColorPickerIndex(index);
  };

  const handleEditToggle = (index: number | null) => {
    if (index === editingIndex) {
      saveTodoChanges(todos[index!]);
      setEditingIndex(null);
    } else {
      if (editingIndex !== null) {
        setTodos(originalTodos);
      }
      setEditingIndex(index);
      setOriginalTodos([...todos]);
    }
  };

  const handleTitleChange = (index: number, newTitle: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index].title = newTitle;
    setTodos(updatedTodos);
  };

  const handleDescriptionChange = (index: number, newDescription: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index].description = newDescription;
    setTodos(updatedTodos);
  };

  const handleFavoriteToggle = async (index: number) => {
    if (index >= 0 && index < todos.length) {
      const updatedTodos = [...todos];
      updatedTodos[index].favorite = !updatedTodos[index].favorite;
      setTodos(updatedTodos);

      try {
        await api.put(`/todo/${updatedTodos[index].id}`, {
          favorite: updatedTodos[index].favorite
        });
      } catch (error) {
        console.error("Falha ao atualizar status de favorito:", error);
      }
    } else {
      console.error("Índice inválido:", index);
    }
  };

  const handleColorSelect = async (index: number, color: CustomColorKey) => {
    const updatedTodos = [...todos];
    updatedTodos[index].color = color;
    setTodos(updatedTodos);
    setOpenColorPickerIndex(null);
    await saveTodoChanges(updatedTodos[index]);
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await api.delete(`/todo/delete/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Erro ao excluir a nota:", error);
    }
  };

  const saveTodoChanges = async (todo: CardProps) => {
    try {
      await api.put(`/todo/${todo.id}`, todo);
    } catch (error) {
      console.error("Falha ao salvar alterações:", error);
    }
  };

  const handleCreateTodo = async (
    title: string,
    description: string,
    favorite: boolean
  ) => {
    const newTodo = {
      title,
      description,
      favorite,
      color: "white"
    };

    try {
      const response = await api.post("/todo", newTodo);
      const createdTodo = response.data;
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error("Erro ao criar nova nota:", error);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        editingIndex,
        openColorPickerIndex,
        handleColorPickerToggle,
        handleEditToggle,
        handleTitleChange,
        handleDescriptionChange,
        handleFavoriteToggle,
        handleColorSelect,
        fetchTodos,
        handleDeleteTodo,
        handleCreateTodo
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
