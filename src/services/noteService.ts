import { api } from "./api";

// Buscar tarefas por título
export function searchByTitle(title: string) {
    return api.get(`/api/tasks?title=${encodeURIComponent(title)}`, {
        withCredentials: true,
    });
}

// Buscar tarefas por cor
export function fetchTasksByColor(color: string) {
    return api.get(`/api/tasks?color=${encodeURIComponent(color)}`, {
        withCredentials: true,
    });
}

// Atualizar apenas o texto da tarefa
export function updateNote(id: string, text: string) {
    return api.patch(
        `/api/tasks/${id}`,
        { text },
        {
            withCredentials: true,
        }
    );
}

// Atualizar somente a cor da tarefa
export function updateColor(id: string, color: string) {
    return api.patch(
        `/api/tasks/${id}/color`,
        { color },
        {
            withCredentials: true,
        }
    );
}

// Deletar tarefa
export function deleteNote(id: string) {
    return api.delete(`/api/tasks/${id}`, {
        withCredentials: true,
    });
}

// Alternar favorito
export function favorite(id: string) {
    return api.patch(`/api/tasks/${id}/favorite`, {
        withCredentials: true,
    });
}

// Criar nova tarefa
export async function createNote(title: string, text: string, color: string) {
    return api.post(
        "/api/tasks",
        {
            title: title[0].toUpperCase() + title.substring(1),
            text,
            isFavorite: color === "black" ? false : true,
        },
        {
            withCredentials: true,
        }
    );
}

// Buscar todas as tarefas
export function getNotes() {
    return api.get("/api/tasks", {
        withCredentials: true,
    });
}
