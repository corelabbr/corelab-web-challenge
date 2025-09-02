import axios from 'axios'

export const httpClint = axios.create({ baseURL: import.meta.env.VITE_API_URL })
