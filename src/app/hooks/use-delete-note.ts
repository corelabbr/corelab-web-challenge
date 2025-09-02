import { useMutation } from '@tanstack/react-query'
import { NotesService } from '../services/notes'

export function useDeleteNote() {
  return useMutation({
    mutationFn: NotesService.delete,
  })
}
