import { api } from "./api";

export function searchByTitle(title: string) {
    return api.get(`/todo/${title}`);
}

export function updateNote(
    id: string,
    text: string
) {
    return api.put(`/todo/update/${id}`, {
        text
    });
}

export function updateColor(
    id: string,
    color: string
) {
    return api.put(`/todo/editcolor/${id}`, {
        color
    });
}

export function deleteNote(
    id: string
) {
    const response = api.delete(`/todo/delete/${id}`);
    return response;
}

export async function favorite(id: string, isFavorite: boolean) {
    const response = await api.put(`/todo/favorite/${id}`, {
        isFavorite: isFavorite,
    });
    return response;
}

export async function createNote(
    title: string,
    text: string,
    color: string,
) {
    const response = api.post('/todo/create', {
        title: title[0].toUpperCase() + title.substring(1),
        text,
        isFavorite: color === 'black' ? false : true,
    });
    return response;
}

export function getNotes(){
    const notes = api.get('/todo/list');
    return notes;
}
