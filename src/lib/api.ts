const API = "http://localhost:3333";

const endpoint = (path: string): string => API + path;

const post = async (path: string, data: any): Promise<any> => {
  return fetch(endpoint(path), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

const put = async (path: string, data: any): Promise<any> => {
  return fetch(endpoint(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

const del = async (path: string): Promise<any> => {
  const res = await fetch(endpoint(path), {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar TODO");
  }

  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  }

  return null;
};

export const getVehicles = async () => {
  return get("/vehicles");
};

export const createTodo = async (todo: {
  title: string;
  description: string;
  is_favorite: boolean;
}) => {
  return post("/todos", todo);
};

export const getTodos = async (search?: string) => {
  const path = search ? `/todos?search=${encodeURIComponent(search)}` : "/todos";
  const response = await get(path);
  return response.data;
};

export const updateTodo = async (id: number, data: any) => {
  return put(`/todos/${id}`, data);
};

export const deleteTodo = async (id: number) => {
  return del(`/todos/${id}`);
};