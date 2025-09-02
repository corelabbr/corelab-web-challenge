import { useMutation } from '@tanstack/react-query'
import { NotesService } from '../services/notes'

export function useCreateNote() {
  return useMutation({
    mutationFn: NotesService.create,
  })
}
