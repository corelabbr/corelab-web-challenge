import type { Note } from '@/app/entities/note'
import { httpClint } from '@/app/lib/http-client'

export type UpdateNoteResponse = Promise<Note>
export type UpdateNoteRequest = Note

export async function updateNote({
  id,
  color,
  description,
  isFavorite,
  title,
}: UpdateNoteRequest): UpdateNoteResponse {
  const response = await httpClint.put<Note>(`/notes/${id}`, {
    color,
    description,
    isFavorite,
    title,
  })

  return response.data
}
