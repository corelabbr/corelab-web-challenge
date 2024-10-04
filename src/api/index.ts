import api from './axios'
import { NotesBody } from '../types/index'

export const getNotes = async () => {
  const response = await api.get('/notes')
  return response.data
}

export const postNotes = async (data: NotesBody) => {
  const response = await api.post('/notes', data)
  return response.data
}

export const putNotes = async (id: string, data: NotesBody) => {
  const response = await api.put(`/notes/${id}`, data)
  return response.data
}

export const deleteNotes = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`)
}

export const getNotesFavorite = async (favorite: boolean) => {
  const response = await api.get(`notes/favorite/${favorite}`)
  return response.data
}
