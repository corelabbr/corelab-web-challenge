import api from "./axios";

export const getNotes = () => api.get("/notes");

export const createNote = (data: any) => api.post("/notes", data);

export const deleteNote = (id: number) => api.delete(`/notes/${id}`);

export const updateNoteTitle = (id: number, title: string) =>
  api.put(`/notes/${id}/title`, { title });

export const updateNoteContent = (id: number, content: string) =>
  api.put(`/notes/${id}/content`, { content });

export const updateNoteColor = (id: number, color: string) =>
  api.put(`/notes/${id}/color`, { color });

export const toggleNoteFavorite = (id: number, favorite: boolean) =>
  api.put(`/notes/${id}/favorite`, { favorite });
