'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type KeyboardEvent, useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { PaintBucket } from '@/components/icons/paint-bucket'
import { Pencil } from '@/components/icons/pencil'
import { X } from '@/components/icons/x'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { NOTE_COLOR_CLASSNAMES } from '@/constants/note-color-classnames'
import { cn } from '@/helpers/cn'
import type { Note } from '@/interfaces/note'
import { server } from '@/server'

const colors = Object.keys(
  NOTE_COLOR_CLASSNAMES,
) as (keyof typeof NOTE_COLOR_CLASSNAMES)[]

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const queryClient = useQueryClient()

  const [isEditColorPopoverOpen, setIsEditColorPopoverOpen] = useState(false)
  const [isEditingDetails, setIsEditingDetails] = useState(false)

  const [editingTitle, setEditingTitle] = useState(note.title)
  const [editingDescription, setEditingDescription] = useState(note.description)

  async function handleSwitchFavorite() {
    await server.notes[':id'].$patch({
      param: { id: note.id },
      json: { favorite: !note.favorite },
    })

    queryClient.invalidateQueries({ queryKey: ['notes'] })
  }

  async function handleDelete() {
    await server.notes[':id'].$delete({ param: { id: note.id } })
    queryClient.invalidateQueries({ queryKey: ['notes'] })
  }

  async function handleEditColor(
    color: Exclude<keyof typeof NOTE_COLOR_CLASSNAMES, 'white'>,
  ) {
    await server.notes[':id'].$patch({
      param: { id: note.id },
      json: { color: color },
    })

    queryClient.invalidateQueries({ queryKey: ['notes'] })
  }

  async function handleEditingFieldsKeydown(event: KeyboardEvent) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key === 'Enter' &&
      editingTitle
    ) {
      await server.notes[':id'].$patch({
        param: { id: note.id },
        json: { title: editingTitle, description: editingDescription },
      })

      queryClient.invalidateQueries({ queryKey: ['notes'] })
      setIsEditingDetails(false)
    }
  }

  return (
    <div
      className={cn(
        'flex h-[27.375rem] flex-col rounded-3xl shadow-[2px,2px,3px,rgba(0,0,0,0.25)]',
        NOTE_COLOR_CLASSNAMES[note.color],
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5',
          note.color !== 'white' && 'border-white',
        )}
      >
        {isEditingDetails ? (
          <input
            className="h-3.5 font-bold text-sm leading-none outline-none"
            value={editingTitle}
            onChange={(event) => setEditingTitle(event.target.value)}
            onKeyDown={handleEditingFieldsKeydown}
          />
        ) : (
          <h3 className="font-bold text-sm leading-none">{note.title}</h3>
        )}

        <button type="button" onClick={handleSwitchFavorite}>
          <Favorite className={cn(!note.favorite && 'fill-none')} />
        </button>
      </div>

      <div className="flex-1 px-5 py-3.5">
        {isEditingDetails ? (
          <textarea
            className="w-full resize-none text-[#4F4F4D] text-sm leading-none outline-none"
            value={editingDescription}
            onChange={(event) => setEditingDescription(event.target.value)}
            onKeyDown={handleEditingFieldsKeydown}
          />
        ) : (
          <p className="break-words text-[#4F4F4D] text-sm leading-none">
            {note.description}
          </p>
        )}
      </div>

      <div className="flex justify-between px-5 py-3">
        <div className="flex gap-1">
          <button
            className={cn(
              'flex size-7 items-center justify-center rounded-full',
              isEditingDetails && 'bg-[#FFE3B3]',
            )}
            type="button"
            onClick={() => setIsEditingDetails((e) => !e)}
          >
            <Pencil />
          </button>

          <Popover
            open={isEditColorPopoverOpen}
            onOpenChange={setIsEditColorPopoverOpen}
          >
            <PopoverTrigger
              className={cn(
                'flex size-7 items-center justify-center rounded-full transition-colors',
                isEditColorPopoverOpen && 'bg-[#FFE3B3]',
              )}
            >
              <PaintBucket />
            </PopoverTrigger>

            <PopoverContent className="grid grid-cols-6 gap-2.5">
              {colors
                .filter((color) => color !== 'white')
                .map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleEditColor(color)}
                    className={cn(
                      'size-9 rounded-full',
                      NOTE_COLOR_CLASSNAMES[color],
                    )}
                  />
                ))}
            </PopoverContent>
          </Popover>
        </div>

        <button
          className="flex size-7 items-center justify-center rounded-full"
          type="button"
          onClick={handleDelete}
        >
          <X />
        </button>
      </div>
    </div>
  )
}
