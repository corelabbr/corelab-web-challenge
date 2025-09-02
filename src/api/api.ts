import axios from 'axios';
export interface IAPIError {
  message: string;
  statusCode: number;
}

export interface IAPIResponse {
  message: string;
  status: number;
  data?: unknown;
}

const NEXT_PUBLIC_API = process.env.NEXT_PUBLIC_API;

const api = axios.create({
  baseURL: NEXT_PUBLIC_API,
});

export default api;
