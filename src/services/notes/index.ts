import { api } from "../../lib/api/axios";
import { Note } from "../../@types/Note";

export const createNote = async (data: Partial<Note>): Promise<Note> => {
    const response = await api.post('/notes', data);
    return response.data;
}

export const getNotes = async (): Promise<Note[]> => {
    const response = await api.get('/notes');
    return response.data.data;
}

export const deleteNote = async (id: number) => {
    const response = await api.delete(`/note/${id}`);
    return response.data.data;
}