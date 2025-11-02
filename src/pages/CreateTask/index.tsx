import React, { useState } from "react";
import { useTasks } from "../../contexts/TasksContext";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({
      title,
      description,
      isCompleted: false,
      isFavorite: false,
      color: "",
    });
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <button type="submit">Criar Tarefa</button>
    </form>
  );
};

export default CreateTask;
