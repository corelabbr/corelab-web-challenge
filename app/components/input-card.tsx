"use client";
import { Star, StarBorder } from "@mui/icons-material";
import { useState } from "react";
import { createNote } from "../api/note/create-note";
import { useSession } from "../context/session-id-context";
import { useNotes } from "../context/notes-context";

export function InputCard() {
  const { userId } = useSession();
  const { setNotes, notes } = useNotes();

  const [inputValue, setInputValue] = useState({ title: "", fav: false });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, title: event.target.value });
  };
  function handleStarClick() {
    setInputValue({ ...inputValue, fav: !inputValue.fav });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita o comportamento padrão do form

    try {
      const response = await createNote({
        color: 1,
        description: "12312312",
        file: "",
        fav: inputValue.fav,
        title: inputValue.title,
        user_id: userId || "",
      });
      setNotes([...notes, response]);
      // Reset the input value
      setInputValue({ title: "", fav: false });
    } catch (error) {
      console.error("Erro ao enviar a nota:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white w-72 h-28 mt-5 rounded-3xl shadow-md flex flex-col border border-[#D9D9D9] lg:w-[32rem] lg:h-40 lg:rounded-none">
        <div className="flex flex-row items-center justify-between border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold leading-10">Titulo</h1>
          <button
            className="relative mt-[1px]" // Adicione "relative" aqui
            type="button"
            onClick={handleStarClick}
          >
            <StarBorder sx={{ color: "#455a64", fontSize: 30 }} />
            {inputValue.fav && (
              <Star
                sx={{
                  color: "#ffa000",
                  fontSize: 20,
                  position: "absolute",
                  top: "5px", // ajuste para centralizar verticalmente
                  left: "5px", // ajuste para centralizar horizontalmente
                }}
              />
            )}
          </button>
        </div>
        <input
          type="text"
          placeholder="Criar nota..."
          value={inputValue.title}
          onChange={handleChange}
          className="mx-4 h-12 border-none bg-transparent shadow-none p-0 m-0 focus:outline-none"
        />
        <button
          type="submit"
          className="hidden" // Opcional: esconda o botão se você só quiser enviar o form com Enter
        >
          Submit
        </button>
      </div>
    </form>
  );
}
