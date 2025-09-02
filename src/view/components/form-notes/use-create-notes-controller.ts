import { useCreateNote } from '@/app/hooks/use-create-note'
import type { GetAllNotesResponse } from '@/app/services/notes/get-all'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { z } from 'zod'
import { COLORS } from './color-list'

export const noteSchema = z.object({
  title: z.string().nonempty('Title é obrigatório'),
  description: z.string(),
})
export type NoteForm = z.infer<typeof noteSchema>

export function useFormNotesController() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  const [isOpen, setIsOpen] = useState(false)
  const [isColorListOpen, setIsColorListOpen] = useState(false)

  const [color, setColor] = useState(COLORS[0])
  const [isFavorite, setIsFavorite] = useState(false)

  const queryClient = useQueryClient()
  const { mutateAsync } = useCreateNote()

  const {
    register,
    setFocus,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteForm>({
    resolver: zodResolver(noteSchema),
  })

  async function handleSubmit(data: NoteForm) {
    try {
      const note = await mutateAsync({
        color,
        description: data.description,
        isFavorite,
        title: data.description,
      })

      reset()
      setColor(COLORS[0])
      setIsFavorite(false)
      setIsOpen(false)

      queryClient.setQueryData(
        ['notes', search],
        (oldData: Awaited<GetAllNotesResponse>) => ({
          notes: [...oldData.notes, note],
        }),
      )
      toast('Sucesso ao criar note')
    } catch {
      toast('Error ao criar note')
    }
  }

  function handleCancel() {
    reset()
    setColor(COLORS[0])
    setIsFavorite(false)
    setIsOpen(false)
  }

  function handleSelectColor(event: React.ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value)
  }

  return {
    isOpen,
    isFavorite,
    errors,
    register,
    color,
    handleFormSubmit,
    setIsFavorite,
    setIsOpen,
    setIsColorListOpen,
    isColorListOpen,
    handleSubmit,
    handleSelectColor,
    handleCancel,
    setFocus,
  }
}
