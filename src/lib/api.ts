import axios, { AxiosInstance } from "axios";

const API_URL = "http://localhost:3333";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Connection: 'keep-alive',
  }
}) as AxiosInstance

export default api