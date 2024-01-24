import React, { useEffect, useState } from "react";
import StarImg from "../../../public/images/star.svg";
import MarkedStarImg from "../../../public/images/marked_star.svg";
import Image from "next/image";
import { useTodo } from "@/context/TodoContext";

const FormNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [favorite, setFavorite] = useState(false);

  const { createTodo } = useTodo();

  const submit = () => {
    createTodo({
      title,
      description,
      completed: false,
      color: "#fff",
      favorite: favorite,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      submit();
      setTitle("");
      setDescription("");
      setFavorite(false);
    }
  };

  return (
    <form className="bg-white w-1/2 mx-auto mt-6 shadow-3xl border-[1px] border-[#D9D9D9] rounded-sm">
      <div className="flex items-center justify-between border-b-2 px-3 py-1">
        <input
          type="text"
          placeholder="Título"
          className="font-bold placeholder-[#4F4F4D] outline-none w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <Image
          onClick={() => setFavorite(!favorite)}
          src={favorite ? MarkedStarImg : StarImg}
          alt="Image Logo"
          priority
          className="cursor-pointer"
        />
      </div>
      <div className="px-3 ">
        <input
          type="text"
          placeholder="Criar nota..."
          className="placeholder-[#4F4F4D] outline-none w-full pt-1 pb-6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </form>
  );
};

export default FormNote;
