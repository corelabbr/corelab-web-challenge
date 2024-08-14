import { api } from "./api";

export function searchByTitle(title: string) {
    return api.get(`api/task/search?title=${title}`, {
        withCredentials: true
    });
}

export function fetchTasksByColor(color: string) {
  try {
    // Codifica o parâmetro da cor: example %23 + hexadecimal color
    const encodedColor = encodeURIComponent(color);
    return api.get(`/api/task/search?color=${encodedColor}`, {
      withCredentials: true
    });
  } catch (error) {
    console.error("Erro ao buscar tarefas por cor:", error);
  }
};

export function updateNote(
    id: string,
    text: string
) {
    return api.put(`api/task/update/${id}`, {
        text
    },
    {
        withCredentials: true
    });
}

export function updateColor(
    id: string,
    color: string
) {
    return api.put(`api/task/color/${id}`, {
        color
    }, {
        withCredentials: true
    });
}

export function deleteNote(
    id: string
) {
    const response = api.delete(`api/task/delete/${id}`, {
        withCredentials: true
    });
    return response;
}

export async function favorite(id: string, isFavorite: boolean) {
    const response = await api.put(`api/task/favorite/${id}`, {
        isFavorite: isFavorite,
    }, {
        withCredentials: true
    });
    return response;
}

export async function createNote(
    title: string,
    text: string,
    color: string,
) {
    const response = api.post('api/task/register', {
        title: title[0].toUpperCase() + title.substring(1),
        text,
        isFavorite: color === 'black' ? false : true,
    }, {
        withCredentials: true
    });
    return response;
}

export function getNotes(){
    const notes = api.get('api/task/list', {
        withCredentials: true,
    });
    return notes;
}
