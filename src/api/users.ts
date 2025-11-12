import api from "./api";

export const getUser = () => {
  return api.get("/auth/me");
};

export const register = (name: string, email: string, password: string) =>
  api.post("/users", { name, email, password });
