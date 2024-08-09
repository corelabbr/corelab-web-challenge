'use client'
import {
  deleteNote as deleteNoteAction,
  updateNote as updateNoteAction,
} from '@/app/actions/NotesApi'
import { useNotesContext } from '@/app/hooks/useNotesContext'
import { cn } from '@/lib/utils'
import { Note } from '@/types/Note'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Card } from '../Card'
import { FavoriteToggleIcon } from '../FavoriteToggleIcon'
import { UploadBoxZone } from '../UploadBoxZone'
import { ColorPopover } from './_components/ColorPopover'
import { DownloadButton } from './_components/DownloadButton'
import { ToogleIconButton } from './_components/ToogleIconButton'

type NoteCardProps = {
  note: Note
}

export const NoteCard = ({ note }: NoteCardProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingNote, setEditingNote] = useState(note)
  const { updateNote, deleteNote } = useNotesContext()
  useEffect(() => {
    setEditingNote(note)
  }, [note])

  const handleIsEditModeChange = () => {
    setIsEditMode((prev) => {
      if (prev) {
        updateNoteAction(editingNote)
      }
      return !prev
    })
  }

  const handleChangeColor = (color: string) => {
    setEditingNote((prev) => ({ ...prev, color }))
    updateNoteAction({
      id: editingNote.id,
      color,
    })
  }

  const handleRemoveNote = async () => {
    await deleteNoteAction(editingNote.id)
    deleteNote(editingNote.id)
  }

  const changeIsFavorite = async (isFavorite: boolean) => {
    setEditingNote((prev) => ({ ...prev, isFavorite }))
    const body = await updateNoteAction({
      id: editingNote.id,
      isFavorite,
    })

    updateNote(body)
  }

  const handleOnUploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

    const { data } = await axios.put<Note>(
      `${baseUrl}/notes/${editingNote.id}/add-file`,
      formData
    )

    updateNote(data)
  }

  return (
    <Card
      className={cn('h-[440px] rounded-2xl flex flex-col')}
      styles={editingNote.color ? { backgroundColor: editingNote.color } : {}}
    >
      <div className="flex justify-between px-5">
        <input
          value={editingNote.title}
          onChange={(e) =>
            setEditingNote((prev) => ({ ...prev, title: e.target.value }))
          }
          readOnly={!isEditMode}
          className="text-xl font-bold py-2 outline-none bg-transparent w-full"
        />
        <FavoriteToggleIcon
          isFavorite={editingNote.isFavorite}
          setIsFavorite={changeIsFavorite}
        />
      </div>
      <hr
        className={cn('border-background', editingNote.color && 'border-white')}
      />
      <textarea
        value={editingNote.content}
        onChange={(e) =>
          setEditingNote((prev) => ({ ...prev, content: e.target.value }))
        }
        readOnly={!isEditMode}
        className="flex-1 p-5 outline-none bg-transparent resize-none"
      />
      {editingNote.fileUrl && (
        <div className="px-5 py-2 flex items-center gap-1">
          <DownloadButton url={editingNote.fileUrl} />
          <a
            target="_blank"
            href={editingNote.fileUrl}
            className="text-sm underline"
          >
            {editingNote.fileUrl.split('/').pop()}
          </a>
        </div>
      )}
      <UploadBoxZone handleOnUploadFile={handleOnUploadFile} className="mx-5" />
      <div className="px-5 py-4 flex justify-between w-full">
        <div className="flex gap-4">
          <ToogleIconButton
            isActive={isEditMode}
            onClick={handleIsEditModeChange}
          >
            <Image
              alt="edit icon"
              src="/edit.svg"
              height={20}
              width={20}
              className="cursor-pointer"
            />
          </ToogleIconButton>
          <ColorPopover
            handleChangeColor={handleChangeColor}
            isPopoverOpen={isPopoverOpen}
            setIsPopoverOpen={setIsPopoverOpen}
          />
        </div>
        <button onClick={handleRemoveNote}>
          <Image
            alt="delete icon"
            src="/x.svg"
            height={20}
            width={20}
            className="cursor-pointer"
          />
        </button>
      </div>
    </Card>
  )
}
