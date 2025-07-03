import { useEffect, useState, type ReactNode } from "react";
import type { NoteProps } from "../@types/note";
import axios from "axios";
import { NotesContext } from "./useNote";

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNote] = useState<NoteProps[]>([]);
  const [searchText, setSearchText] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchText.toLowerCase()) ||
    note.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const getAllNotes = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/notes");
      const notes = response.data;
      setNote(notes);
      return notes;
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const addNote = async (
    title: string,
    description: string,
    favorite: boolean,
    color: string
  ) => {
    try {
      const response = await axios.post("http://localhost:3000/api/notes", {
        title,
        description,
        favorite,
        color
      });
      const newNote = response.data;
      setNote((oldNotes) => [...oldNotes, newNote]);
    } catch (error) {
      console.error("Erro ao criar nota:", error);
    }
  };

  const updateNote = async (id: string, title: string, description: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/notes/${id}`,
        {
          id,
          title,
          description,
        }
      );
      const updatedNote = response.data;
      setNote((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? updatedNote : note))
      );
      return updatedNote;
    } catch (error) {
      console.error("Erro ao atualizar nota:", error);
      throw error;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/notes/${id}`);
      setNote((oldNotes) => oldNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Erro ao deletar nota:", error);
      throw error;
    }
  };

  async function toggleFavorite(id: string) {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/notes/${id}/favorite`
      );
      const updatedNote = response.data;
      setNote((oldNotes) =>
        oldNotes.map((note) => (note.id === id ? updatedNote : note))
      );
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
    }
  }

  const toggleColor = async (id: string, color: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/notes/${id}/color`,
        { color }
      );
      const updatedNote = response.data;

      setNote((oldNotes) =>
        oldNotes.map((note) => (note.id === id ? updatedNote : note))
      );
    } catch (error) {
      console.error("Erro ao alternar cor da nota:", error);
      throw error;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        filteredNotes,
        searchText,
        setSearchText,
        addNote,
        getAllNotes,
        updateNote,
        deleteNote,
        toggleFavorite,
        toggleColor,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
