import { INote } from "../types/Note";

const API = "http://localhost:3001";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

const post = async (path: string, body: any): Promise<any> => {
  return fetch(endpoint(path), {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then((res) => res.json());
};

const put = async (path: string, body: any): Promise<any> => {
  return fetch(endpoint(path), {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then((res) => res.json());
};

const del = async (path: string): Promise<any> => {
  return fetch(endpoint(path), {
    method: "DELETE",
  }).then((res) => res.json());
};

export const getNotes = async () => {
  return get("/notes");
};

export const createNote = async (note: INote) => {
  return post("/notes", note);
};

export const updateNote = async (note: INote) => {
  return put(`/notes/${note._id}`, note);
}

export const deleteNote = async (id: string) => {
  return del(`/notes/${id}`);
}
