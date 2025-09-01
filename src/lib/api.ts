const API = "http://localhost:3333/api/v1";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

export const getTodos = async () => {
  return get("/todos");
};

export const createTodo = async (data: {
  title: string;
  description: string;
  color: string;
  is_favorite: boolean;
}) => {
  const response = await fetch(endpoint("/todos"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateTodo = async (id: number, data: {
  title: string;
  description: string;
  color: string;
  is_favorite: boolean;
}) => {
  const response = await fetch(endpoint(`/todos/${id}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(endpoint(`/todos/${id}`), {
    method: "DELETE",
  });
  return response.json();
};