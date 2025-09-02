import axios from "axios";
import { getUserId } from "../utils/user";

const api = axios.create({
  baseURL: "http://localhost:3000", // substitua por ENV
});

api.interceptors.request.use((config) => {
  const userId = getUserId();

  if (config.method === "get" && config.url === "/") {
    config.params = { ...(config.params || {}), userId };
  } else if (config.method === "post" || config.method === "patch") {
    config.data = { ...(config.data || {}), userId };
  }

  return config;
});

export default api;
