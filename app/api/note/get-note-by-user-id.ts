import { Note, NotesResponseAPI } from "@/app/@types/types";
import api from "../axios";

export async function getNotesByUserId(userId: string): Promise<Note[]> {
  const response = await api
    .get<NotesResponseAPI[]>(`/notes/user/${userId}`)
    .catch((error) => {
      console.error("Erro ao buscar notas:", error);
      throw error;
    });
  if (response.status !== 200) {
    return [];
  }
  return response.data.map((note: NotesResponseAPI) => ({
    id: note._id,
    color: note.props.color,
    description: note.props.description,
    fav: note.props.fav,
    file: note.props.file,
    title: note.props.title,
    user_id: note.props.user_id,
  }));
}
