"use client";

import { useEffect, useRef, useState } from "react";
import Card from "./components/card";
import Styles from "./page.module.scss";
import ColorPicker from "./components/pickerColor";
import { Plus, Star } from "lucide-react";
import HttpClient from "./http/httpClient";
import { Todo } from "./types/todoType";

export default function Home() {
  const [selectedColor, setSelectedColor] = useState("#E2E8F0");
  const newTodo = useRef<HTMLInputElement | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState("");
  const [editColor, setEditColor] = useState("");
  const [editText, setEditText] = useState("");

  const handleAddTask = async () => {
    if (!newTodo.current?.value) {
      return;
    }

    const todo = {
      title: newTodo.current.value,
      color: selectedColor,
      is_favorite: false,
    }

    await HttpClient.post("task", todo);
    newTodo.current.value = "";
    await fetchTodos();
  }

  const fetchTodos = async () => {
    const response = await HttpClient.get<Todo[]>("task");
    setTodos(response);
  }

  const deletedTask = async (id: string) => {
    await HttpClient.delete(`task/${id}`);
    await fetchTodos();
    setIsEditing("");
  }

  const toggleFavorite = async (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      const updatedTodo = {
        ...todo,
        is_favorite: !todo.is_favorite,
      };
      await HttpClient.put("task", updatedTodo);
      await fetchTodos();
    }
  }

  const startEditing = (todo: Todo) => {
    setEditColor(todo.color);
    setEditText(todo.title);
    setIsEditing(todo.id);
  }

  const handleEdit = async (todo: Todo) => {
    if (!editText.trim()) return;

    const updatedTodo = {
      ...todo,
      title: editText.trim(),
      color: editColor,
    };
    
    await HttpClient.put("task", updatedTodo);
    await fetchTodos();
    cancelEditing()
  }

  const cancelEditing = () => {
    setIsEditing("");
    setEditText("");
    setEditColor("");
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  return (
    <main className={Styles.container}>
      <form
        className={Styles.form}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={Styles.containerForm}>
          <input
            type="text"
            className={Styles.input}
            ref={newTodo}
            placeholder="O que você precisa fazer?"
          />
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
          <button
            type="submit"
            className={Styles.button}
            onClick={handleAddTask}
          >
            <Plus className={Styles.icon} />
            Adicionar Tarefa
          </button>
        </div>
      </form>

      <div className={Styles.filterContainer}>
        <button
          className={`${Styles.filterButton} ${showFavoritesOnly ? Styles.active : ''}`}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Star />
          {showFavoritesOnly ? "Mostrar Todos" : "Mostrar Favoritos"}
        </button>
      </div>

      <div className={Styles.cardList}>
        <Card 
          todos={todos}
          showFavoritesOnly={showFavoritesOnly}
          deletedTask={deletedTask}
          toggleFavorite={toggleFavorite}
          handleEdit={handleEdit}
          startEditing={startEditing}
          cancelEditing={cancelEditing}
          isEditing={isEditing}
          editText={editText}
          setEditText={setEditText}
          editColor={editColor}
          setEditColor={setEditColor}
        />
      </div>
    </main>
  );
}



