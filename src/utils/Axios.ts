import axios from "axios";

export const AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
})