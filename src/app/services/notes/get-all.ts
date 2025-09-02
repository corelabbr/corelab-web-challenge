import type { Note } from '@/app/entities/note'
import { httpClint } from '@/app/lib/http-client'

export type GetAllNotesResponse = Promise<{
  notes: Note[]
}>

export type GetAllNotesRequest = {
  search: string
}

export async function getAllNotes({
  search = '',
}: GetAllNotesRequest): GetAllNotesResponse {
  const response = await httpClint.get<{ notes: Note[] }>('/notes', {
    params: {
      search,
    },
  })

  return response.data
}
