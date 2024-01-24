"use client";
import CardNote from "@/components/cardNote";
import FormNote from "@/components/formNote";
import Header from "@/components/header";
import { useTodo } from "@/context/TodoContext";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { todos, readTodos } = useTodo();
  const [search, setSearch] = useState("");

  useEffect(() => {
    readTodos();
  }, []);

  useEffect(() => {
    readTodos();
  }, [todos]);

  const favoriteNotes = todos?.filter((note) => note.favorite);
  const commonNotes = todos?.filter((note) => !note.favorite);

  const filteredTodos = useMemo(() => {
    const searchTerm = search.toLowerCase();

    return todos.filter(
      (todo) =>
        todo.title?.toLowerCase().includes(searchTerm) ||
        todo.description?.toLowerCase().includes(searchTerm) ||
        todo.color?.toLowerCase().includes(searchTerm)
    );
  }, [search, todos]);

  return (
    <>
      <Header setSearch={setSearch} />
      <FormNote />
      {filteredTodos.length === 0 && (
        <h2 className="w-4/5 mx-auto pl-4 mt-6 text-[#464646] text-center">
          Nenhuma nota encontrada!
        </h2>
      )}
      {search == "" && (
        <>
          {favoriteNotes.length !== 0 && (
            <h2 className="w-4/5 mx-auto pl-4 mt-6 text-[#464646]">
              Favoritas
            </h2>
          )}
          <section className="w-4/5 mx-auto my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteNotes?.map((note) => (
              <CardNote
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                completed={note.completed}
                color={note.color}
                favorite={note.favorite}
              />
            ))}
          </section>

          {commonNotes.length !== 0 && (
            <h2 className="w-4/5 mx-auto pl-4 text-[#464646]">Outras</h2>
          )}
          <section className="w-4/5 mx-auto my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {commonNotes?.map((note) => (
              <CardNote
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                completed={note.completed}
                color={note.color}
                favorite={note.favorite}
              />
            ))}
          </section>
        </>
      )}
      {search !== "" && filteredTodos.length > 0 && (
        <>
          <h2 className="w-4/5 mx-auto pl-4 mt-6 text-[#464646]">
            {filteredTodos.some((note) => note.favorite)
              ? "Favoritas"
              : "Outras"}
          </h2>
          <section className="w-4/5 mx-auto my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredTodos.map((note) => (
              <CardNote
                key={note.id}
                id={note.id}
                title={note.title}
                description={note.description}
                completed={note.completed}
                color={note.color}
                favorite={note.favorite}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}
