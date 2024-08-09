'use client'
import { createNote } from '@/app/actions/NotesApi'
import { FormEvent, useState } from 'react'
import { Card } from '../Card'
import { FavoriteToggleIcon } from '../FavoriteToggleIcon'
import { Note } from '@/types/Note'
import { useNotesContext } from '@/app/hooks/useNotesContext'



export const CreateNoteCard = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)
  const { addNote } = useNotesContext()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const body = await createNote({
      content,
      isFavorite,
      title,
    })

    addNote(body)

    setTitle('')
    setContent('')
    setIsFavorite(false)
  }

  return (
    <Card className="sm:w-[530px] h-[120px]">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div>
          <div className="flex px-5">
            <input
              type="text"
              placeholder="Titulo..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 text-xl font-bold py-2 outline-none"
            />
            <FavoriteToggleIcon
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          </div>
          <hr />
          <div className="flex px-5 py-2">
            <textarea
              placeholder="Criar nota..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="flex-1 outline-none resize-none res"
            />
          </div>
        </div>
        {title && content && (
          <button
            type="submit"
            className=" bg-emerald-400 p-2 rounded-md self-end shadow-lg"
          >
            Criar
          </button>
        )}
      </form>
    </Card>
  )
}
