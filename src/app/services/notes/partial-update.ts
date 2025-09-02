import type { Note } from '@/app/entities/note'
import { httpClint } from '@/app/lib/http-client'

export type PartialUpdateNoteResponse = Promise<Note>
export type PartialUpdateNoteRequest = Partial<Note> & { id: number }

export async function partialUpdateNote({
  id,
  color,
  description,
  isFavorite,
  title,
}: PartialUpdateNoteRequest): PartialUpdateNoteResponse {
  const response = await httpClint.patch<Note>(`/notes/${id}`, {
    color,
    description,
    isFavorite,
    title,
  })

  return response.data
}
