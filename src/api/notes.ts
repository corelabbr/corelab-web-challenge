import api from "./api";
import { INote } from "../types/Note";

export const createNote = (note: any) => api.post("/notes", note);

export const updateNote = (id: string, note: Partial<INote>) =>
  api.put(`/notes/${id}`, note);

export const deleteNote = (id: string) => api.delete(`/notes/${id}`);

export const updateColor = (id: string, color: string) =>
  api.patch(`notes/${id}/color`, { color });

export const updateFavorite = (id: string, isFavorite: boolean) =>
  api.patch(`notes/${id}/favorite`, { isFavorite });
