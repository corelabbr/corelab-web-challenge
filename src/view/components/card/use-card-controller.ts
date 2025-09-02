import type { Note } from '@/app/entities/note'
import { useDeleteNote } from '@/app/hooks/use-delete-note'
import { usePartialUpdateNote } from '@/app/hooks/use-partial-update-note'
import { useUpdateNote } from '@/app/hooks/use-update-note'
import type { GetAllNotesResponse } from '@/app/services/notes/get-all'
import { useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent, type MouseEvent } from 'react'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'

type UseCardControllerProps = {
  note: Note
}

export function useCardController({ note }: UseCardControllerProps) {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''

  const [isColorListOpen, setIsColorListOpen] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  const [title, setTitle] = useState(note.title)
  const [description, setDescription] = useState(note.description)
  const [color, setColor] = useState(note.color)
  const [isFavorite, setIsFavorite] = useState(note.isFavorite)

  const queryClient = useQueryClient()
  const { mutateAsync: mutateUpdate } = useUpdateNote()
  const { mutateAsync: mutateDelete } = useDeleteNote()
  const { mutateAsync: mutatePartialUpdate } = usePartialUpdateNote()

  async function handleSubmitUpdate(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await mutateUpdate({
        color,
        description,
        id: note.id,
        isFavorite,
        title,
      })

      queryClient.setQueryData(
        ['notes', search],
        (oldData: Awaited<GetAllNotesResponse>) => ({
          notes: [
            ...oldData.notes.map((item) => item.id === note.id && response),
          ],
        }),
      )
      setIsEditable(false)
      toast.success('Sucesso ao fazer update')
    } catch {
      toast.error('Error ao fazer update')
    }
  }

  async function handleDelete(id: number) {
    try {
      await mutateDelete({ id })
      queryClient.setQueryData(
        ['notes', search],
        (oldData: Awaited<GetAllNotesResponse>) => ({
          notes: [...oldData.notes.filter((item) => item.id !== id)],
        }),
      )
      toast.success('Sucesso ao fazer delete')
    } catch {
      toast.error('Error ao deletar ')
    }
  }

  function handleEditable(isEditable: boolean) {
    setIsEditable(isEditable)
  }

  async function handleFavoriteNote(id: number, isFavorite: boolean) {
    try {
      await mutatePartialUpdate({ id, isFavorite })

      queryClient.setQueryData(
        ['notes', search],
        (oldData: Awaited<GetAllNotesResponse>) => ({
          notes: [
            ...oldData.notes.map((item) =>
              item.id === id ? { ...item, isFavorite } : item,
            ),
          ],
        }),
      )
      toast.success(
        `Sucesso ao ${isFavorite ? 'favoritar' : 'desfavoritar'} note com id ${id}`,
      )
    } catch {
      toast.error(
        `Error ao ${isFavorite ? 'favoritar' : 'desfavoritar'} note com id ${id}`,
      )
    }
  }
  function handleSelectColor(event: React.ChangeEvent<HTMLInputElement>) {
    setColor(event.target.value)
  }

  function handleCancel(e: MouseEvent) {
    e.stopPropagation()

    setIsEditable(false)
    setColor(note.color)
    setTitle(note.title)
    setDescription(note.description)
    setIsFavorite(note.isFavorite)
  }

  return {
    isFavorite,
    description,
    title,
    color,
    setTitle,
    setDescription,
    setIsFavorite,
    setIsColorListOpen,
    isColorListOpen,
    handleSubmitUpdate,
    handleDelete,
    handleSelectColor,
    handleEditable,
    isEditable,
    handleCancel,
    handleFavoriteNote,
  }
}
