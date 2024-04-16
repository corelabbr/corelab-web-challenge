import { api } from "./api";

export function searchByTitle(title: string) {
    return api.get(`/api/notes/search/${title}`);
}

export function updateNote(
    id: string,
    text: string
) {
    return api.put(`/api/notes/${id}`, {
        text
    });
}

export function updateColor(
    id: string,
    color: string
) {
    return api.put(`/api/notes/color/${id}`, {
        color
    });
}

export function deleteNote(
    id: string
) {
    const response = api.delete(`/api/notes/${id}`);
    return response;
}

export async function favorite(id: string, isFavorite: boolean) {
    const response = await api.put(`/api/notes/favorite/${id}`, {
        isFavorite: isFavorite,
    });
    return response;
}

export async function createNote(
    title: string,
    text: string,
    color: string,
) {
    const response = await api.post('/api/notes', {
        title: title[0].toUpperCase() + title.substring(1),
        text,
        isFavorite: color === 'black' ? false : true,
    });

    const responseData = response.data;

    return responseData;
}

export function getNotes(){
    const notes = api.get('/api/notes');
    return notes;
}
