'use server'

import { Note } from "@/types/Note"

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ||  'http://localhost:8080'

export const getNotes = async (): Promise<Note[]> => {
  const response = await fetch(`${apiBaseUrl}/notes`)

  if (!response.ok) {
    throw new Error('Erro ao criar nota')
  }

  return response.json()
}

export const createNote = async (note: Omit<Note, 'id'>) => {
  const response = await fetch(`${apiBaseUrl}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar nota')
  }

  return response.json()
}

export const updateNote = async (note: Partial<Note> & { id: string }) => {
  const response = await fetch(`${apiBaseUrl}/notes/${note.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar nota')
  }

  return response.json()
}

export const deleteNote = async (id: string) => {
  const response = await fetch(`${apiBaseUrl}/notes/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Erro ao criar nota')
  }
}