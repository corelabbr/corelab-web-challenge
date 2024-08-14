import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/*
    Response Interceptor
*/
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Remove o token e redireciona para a página de login
            localStorage.removeItem("auth-token");
            localStorage.removeItem("token-expiration");
            useNavigate()("/signin");
        }
        return Promise.reject(error);
    }
);

export { api };
