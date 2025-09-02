import { httpClint } from '@/app/lib/http-client'

export type DeleteNotesRequest = {
  id: number
}

export async function deleteNote({ id }: DeleteNotesRequest) {
  await httpClint.delete(`/notes/${id}`)
}
