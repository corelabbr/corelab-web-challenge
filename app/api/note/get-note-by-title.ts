import { Note, NotesResponseAPI } from "@/app/@types/types";
import api from "../axios";
import { getNotesByUserId } from "./get-note-by-user-id";

interface GetNoteByTitleDTO {
  title?: string;
  user_id: string;
}

export async function getNoteByTitle(
  data: GetNoteByTitleDTO
): Promise<Note[] | undefined> {
  if (!data.title) {
    return getNotesByUserId(data.user_id);
  }

  try {
    const response = await api.get<NotesResponseAPI[]>(
      `/notes?title=${data.title}&user_id=${data.user_id}`
    );

    if (response.status === 200) {
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
    if (response.status === 404) {
      return [];
    }
  } catch (error) {
    return [];
  }
}
