const API = "http://localhost:8080";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

export const getTasks = async () => {
  return get("/api/v1/task");
};
