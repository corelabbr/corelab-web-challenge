import { useMutation } from '@tanstack/react-query'
import { NotesService } from '../services/notes'

export function usePartialUpdateNote() {
  return useMutation({
    mutationFn: NotesService.partialUpdate,
  })
}
