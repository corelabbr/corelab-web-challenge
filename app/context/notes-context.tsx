import { createContext, useContext, useState, useEffect } from "react";
import { Note } from "../@types/types";
import { getNotesByUserId } from "../api/note/get-note-by-user-id";
import { useSession } from "./session-id-context";

interface NotesContextProps {
  notes: Note[];
  setNotes: (data: Note[]) => void;
  refreshNotes: () => void;
}

const NotesContext = createContext<NotesContextProps | undefined>(undefined);

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { userId } = useSession();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!userId) return;
      try {
        const response = await getNotesByUserId(userId);
        setNotes(response);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };
    fetchNotes();
  }, [userId]);

  const refreshNotes = async () => {
    if (!userId) return;
    try {
      const response = await getNotesByUserId(userId);
      setNotes(response);
    } catch (error) {
      console.error("Failed to refresh notes:", error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, refreshNotes }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
