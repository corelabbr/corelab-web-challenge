import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Header from "../components/Header";
import { useTodos } from "../hooks/useTodos";
import type { Todo } from "../types/todo";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { todos, isLoading, error, createTodo, updateTodo, deleteTodo } =
    useTodos();

  const handleAddTodo = (todo: Todo) => {
    createTodo(todo);
  };

  const handleUpdateTodo = (todo: Todo) => {
    updateTodo(todo);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error loading todos: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-[#f9fafb] p-4">
      <div className="flex flex-col w-full gap-8 max-w-screen-md">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <TodoForm onAdd={handleAddTodo} />
        <TodoList
          todos={filteredTodos}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
}
