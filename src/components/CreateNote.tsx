"use client";
import React, { useState } from "react";
import StarIcon from "./Icons/StarIcon";
import CheckIcon from "./Icons/CheckIcon";
import { useTodos } from "@/context/TodosContext";

const CreateNote = () => {
  const { handleCreateTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleFavoriteToggle = () => {
    setFavorite(!favorite);
  };

  const handleCreate = async () => {
    await handleCreateTodo(title, description, favorite);
    setTitle("");
    setDescription("");
    setFavorite(false);
  };

  return (
    <div className="bg-white max-w-[530px] w-[390px] md:w-[530px] rounded-3xl md:rounded-sm border border-border-primary shadow-md mb-10">
      <div className="flex items-center border-b border-border-primary px-6 py-3 justify-between">
        <input
          maxLength={25}
          placeholder="Título"
          value={title}
          onChange={handleTitleChange}
          className="font-bold text-black placeholder:text-black focus:outline-none"
        />
        <button onClick={handleFavoriteToggle}>
          <StarIcon
            className={`fill-black ${favorite ? "text-yellow-500" : ""}`}
          />
        </button>
      </div>
      <div className="px-6 py-3">
        <textarea
          placeholder="Criar nota..."
          value={description}
          onChange={handleDescriptionChange}
          className="placeholder:text-text-placeholder focus:outline-none w-full resize-none text-text-text"
        />
      </div>
      <div className="flex items-center justify-end px-6 py-3">
        <button onClick={handleCreate} className="">
          <CheckIcon />
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
