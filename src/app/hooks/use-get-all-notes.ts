import { useQuery } from '@tanstack/react-query'
import { NotesService } from '../services/notes'

type UseGetAllNotesProps = {
  search: string
}

export function useGetAllNotes({ search }: UseGetAllNotesProps) {
  return useQuery({
    queryKey: ['notes', search],
    queryFn: () => NotesService.getAll({ search }),
  })
}
