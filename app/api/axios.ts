import axios from "axios";

const URL = "http://localhost:3000";

const api = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Trata globalmente os erros de resposta
    if (error.response && error.response.status === 404) {
      console.warn("Erro 404: Nota não encontrada.");
    } else {
      console.error("Erro ao buscar dados:", error);
    }
    return Promise.reject(error);
  }
);

export default api;
