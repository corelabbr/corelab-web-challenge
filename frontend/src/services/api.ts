import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333" || process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});
