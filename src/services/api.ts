import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
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
            localStorage.removeItem("token");
            localStorage.removeItem("token-expiration");
            window.location.href = "/signin"; // redireciona para login

        }
        return Promise.reject(error);
    }
);

export { api };
