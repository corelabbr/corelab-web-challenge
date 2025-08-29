const API = "http://localhost:3333";

const endpoint = (path: string): string => API + path;
const headers = {
  'Content-Type': 'application/json',
};

const getHttp = async (path: string): Promise<any> => {
  return fetch(endpoint(path), { method: "GET", headers }).then((res) => res.json());
};

const postHttp = async (path: string, body: any): Promise<any> => {
  return fetch(endpoint(path), { body, method: "POST", headers }).then((res) => res.json());
};

const putHttp = async (path: string, body: any): Promise<any> => {
  return fetch(endpoint(path), { body, method: "PUT", headers }).then((res) => res.json());
};

const deleteHttp = async (path: string): Promise<any> => {
  return fetch(endpoint(path), { method: "DELETE", headers }).then((res) => res.json());
};

export const getNotes = async () => {
  return getHttp("/notes");
};

export const createNote = async (body: any) => {
  return postHttp("/notes", JSON.stringify(body));
};

export const updateNote = async (id: string, body: any) => {
  return putHttp(`/notes/${id}`, JSON.stringify(body));
};

export const deleteNote = async (id: any) => {
  return deleteHttp(`/notes/${id}`);
};
