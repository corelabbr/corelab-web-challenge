import type { Note } from '@/app/entities/note'
import { httpClint } from '@/app/lib/http-client'

export type CreateNoteResponse = Promise<Note>
export type CreateNoteRequest = {
  title: string
  description: string
  color: string
  isFavorite: boolean
}

export async function createNote({
  color,
  description,
  isFavorite,
  title,
}: CreateNoteRequest): CreateNoteResponse {
  const response = await httpClint.post<Note>('/notes', {
    color,
    description,
    isFavorite,
    title,
  })

  return response.data
}
