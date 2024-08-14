"use client";
import { useState } from "react";
import { useSession } from "../context/session-id-context";
import { useNotes } from "../context/notes-context";
import { getNoteByTitle } from "../api/note/get-note-by-title";

export function SearchBar() {
  const { userId } = useSession();
  const { notes, setNotes: updateNotes } = useNotes();
  const [searchTerm, setSearchTerm] = useState<string>("");

  async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    const response = await getNoteByTitle({
      user_id: userId as string,
      title: newSearchTerm,
    });
    if (response) {
      updateNotes(response);
    }
  }

  return (
    <div className="h-7 lg:w-[32rem]">
      <input
        type="text"
        placeholder="Pesquisar notas"
        className="w-56 h-full border rounded-sm py-4 text-sm px-2 focus:w-72 animate-pulse"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
}
