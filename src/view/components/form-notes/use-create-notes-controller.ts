import { useCreateNote } from '@/app/hooks/use-create-note'
import type { GetAllNotesResponse } from '@/app/services/notes/get-all'
import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'
import { COLORS } from './color-list'

export function useFormNotesController() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const titleRef = useRef<HTMLInputElement | null>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [isColorListOpen, setIsColorListOpen] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState(COLORS[0])
  const [isFavorite, setIsFavorite] = useState(false)

  const queryClient = useQueryClient()
  const { mutateAsync } = useCreateNote()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      const note = await mutateAsync({
        color,
        description,
        isFavorite,
        title,
      })

      setTitle('')
      setDescription('')
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
    setTitle('')
    setDescription('')
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
    description,
    title,
    color,
    setTitle,
    setDescription,
    setIsFavorite,
    setIsOpen,
    setIsColorListOpen,
    isColorListOpen,
    handleSubmit,
    handleSelectColor,
    titleRef,
    handleCancel,
  }
}
