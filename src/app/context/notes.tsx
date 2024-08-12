"use client";

import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";
import { Bounce, toast, TypeOptions } from "react-toastify";

import { type Note, type Notes } from "@/@types/note";
import useApi from "@/app/helpers/api";

type ContextNotesType = {
  notes: Notes;
  loading: boolean;
  totalFavorites: number;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (note: Note) => Promise<void>;
  createNote: (note: Note) => Promise<void>;
  addFavoriteNote: (note: Note) => Promise<void>;
  updateColorNote: (note: Note) => Promise<void>;
  searchNote: (query: string) => Promise<void>;
  listNotes: (userId: string) => Promise<void>;
};

export const ContextNotes = createContext({} as ContextNotesType);

export default function NotesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [notes, setNotes] = useState<Notes>([]);
  const totalFavorites = notes.filter((note) => note.favorite).length;
  const api = useApi();

  const notify = (type: TypeOptions, message?: string) => {
    toast(message, {
      type,
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // theme: "colored",
      transition: Bounce,
    });
  };
  const fetchNotes = async (userId: string): Promise<Notes> => {
    const response = await api.fetchNotes(userId);
    return response.data;
  };
  const listNotes = async (userId: string): Promise<void> => {
    const notes = await fetchNotes(userId);
    setNotes(
      notes.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  };
  const searchNote = async (query: string): Promise<void> => {
    const result = await api.searchNote(query);
    setNotes(
      [...result.notes].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
  };
  const updateNote = async (note: Note) => {
    try {
      await api.updateNote(note);
      notify("success", "Atualizado");
    } catch (error) {
      notify("error", "Erro ao atualizar nota");
    }
  };
  const deleteNote = async (note: Note) => {
    try {
      await api.deleteNote(note);
      const notesFiltered = notes.filter((n) => n.id !== note.id);
      setNotes(
        notesFiltered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
      notify("success", "Nota deletada");
    } catch (error) {
      notify("error", "Erro ao deletar nota");
    }
  };
  const createNote = async (note: Note) => {
    try {
      const newNote = await api.createNote(note);
      setNotes(
        [...notes, newNote.data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
      notify("success", "Nota criada");
    } catch (error) {
      notify("error", "Erro ao criar nota");
    } finally {
      setLoading(false);
    }
  };

  const addFavoriteNote = async (note: Note) => {
    const getNote = notes.find((n) => n.id === note.id);
    if (!getNote) return;
    getNote.favorite = note.favorite;
    const notesFiltered = notes.filter((n) => n.id !== note.id);
    setNotes(
      [...notesFiltered, getNote].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
    return await updateNote(note);
  };
  const updateColorNote = async (note: Note) => {
    const getNote = notes.find((n) => n.id === note.id);
    if (!getNote) return;
    getNote.color = note.color;
    const notesFiltered = notes.filter((n) => n.id !== note.id);
    setNotes(
      [...notesFiltered, getNote].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    );
    await updateNote(note);
  };

  useEffect(() => {
    const handleFetchNotes = async () => {
      const userId = getCookie("user_id");
      if (!userId) return;
      const notes = await fetchNotes(userId);
      setNotes(
        notes.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    };
    handleFetchNotes().finally(() => setLoading(false));
  }, []);

  return (
    <ContextNotes.Provider
      value={{
        notes,
        loading,
        totalFavorites,
        searchNote,
        listNotes,
        createNote,
        deleteNote,
        updateNote,
        addFavoriteNote,
        updateColorNote,
      }}
    >
      {children}
    </ContextNotes.Provider>
  );
}
