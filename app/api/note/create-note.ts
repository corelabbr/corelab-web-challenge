import { Note } from "@/app/@types/types";
import api from "../axios";

interface CreateNoteDTO {
  title: string;
  description: string;
  fav: boolean;
  color: number;
  file: string;
  user_id: string;
}

export async function createNote(data: CreateNoteDTO): Promise<Note> {
  const response = await api.post("/notes", data).catch((error) => {
    console.error("Erro ao criar nota:", error);
    throw error;
  });
  return {
    id: response.data._id,
    title: response.data.props.title,
    description: response.data.props.description,
    fav: response.data.props.fav,
    color: response.data.props.color,
    file: response.data.props.file,
    user_id: response.data.props.user_id,
  };
}
