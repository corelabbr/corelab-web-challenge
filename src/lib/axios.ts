import axios from 'axios'
import { config } from '@/config'

export const server = axios.create({
  baseURL: config.NEXT_PUBLIC_API_BASE_URL,
})
