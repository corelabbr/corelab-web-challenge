import { Note } from "@/app/@types/types";
import api from "../axios";

interface UpdateNoteResponse {
  id: string;
  title?: string;
  fav?: boolean;
  color?: number;
  file?: string;
  user_id: string;
}

export async function updateNote(note: UpdateNoteResponse): Promise<Note> {
  const response = await api
    .put<Note>(`/notes/${note.id}`, note)
    .catch((error) => {
      console.error("Erro ao atualizar nota:", error);
      throw error;
    });
  return response.data;
}
