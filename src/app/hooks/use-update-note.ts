import { useMutation } from '@tanstack/react-query'
import { NotesService } from '../services/notes'

export function useUpdateNote() {
  return useMutation({
    mutationFn: NotesService.update,
  })
}
