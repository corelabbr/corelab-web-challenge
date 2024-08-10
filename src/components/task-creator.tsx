"use client";
import React, { useState } from "react";
import { Star } from "lucide-react";

import { useTaskStore } from "../store/taskStore";
import { toast } from "react-toastify";

export function TaskCreator() {
  const [isFavorited, setFavorite] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [taskColor, setTaskColor] = useState("#FFFFFF");
  const taskStore = useTaskStore((store) => store);

  const isActiveAddBtn = taskTitle.length > 1 && taskContent.length > 1;

  const createTask = async () => {
    await taskStore.createTask({
      title: taskTitle,
      content: taskContent,
      color: taskColor,
      isFavorite: isFavorited,
    });
    setFavorite(false);
    setTaskTitle("");
    setTaskContent("");
    setTaskColor("#FFFFFF");
    toast.success("Tarefa criada!");
  };

  return (
    <div className="min-w-80 md:w-[550px] bg-white mb-4 rounded-2xl w-80 mx-auto shadow-md shadow-zinc-400">
      <div className="flex items-center py-5 px-4 justify-between border-b-2 border-b-gray-100 w-full">
        <input
          type="text"
          placeholder="Título"
          className="outline-none"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        {isFavorited ? (
          <Star
            size={25}
            fill="#FFC222"
            className="cursor-pointer"
            onClick={() => setFavorite(false)}
          />
        ) : (
          <Star
            size={25}
            className="cursor-pointer"
            onClick={() => setFavorite(true)}
          />
        )}
      </div>
      <input
        type="text"
        placeholder="Criar nota..."
        value={taskContent}
        className="px-4 py-5 w-full outline-none bg-transparent text-sm block"
        onChange={(e) => setTaskContent(e.target.value)}
        required
      />

      <div className="flex w-full justify-end items-center p-2">
        <button
          className="text-zinc-800 disabled:text-zinc-400 font-bold  text-md rounded-full transition duration-300 px-3 py-3 enabled:cursor-pointer"
          disabled={!isActiveAddBtn}
          onClick={() => createTask()}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
