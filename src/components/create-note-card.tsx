'use client'

import { useQueryClient } from '@tanstack/react-query'
import { type KeyboardEvent, useState } from 'react'
import { Favorite } from '@/components/icons/favorite'
import { cn } from '@/helpers/cn'
import { useScopedI18n } from '@/locales/client'
import { server } from '@/server'

export function CreateNoteCard() {
  const t = useScopedI18n('home.create_note_card')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [favorite, setFavorite] = useState(false)

  const queryClient = useQueryClient()

  async function handleKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter' && title) {
      await server.notes.$post({
        json: { title, description, favorite },
      })

      queryClient.invalidateQueries({ queryKey: ['notes'] })

      setTitle('')
      setDescription('')
      setFavorite(false)
    }
  }

  return (
    <div className="w-full max-w-[33.125rem] self-center rounded-sm border border-[#D9D9D9] bg-white shadow-[1px,1px,3px,rgba(0,0,0,0.25)]">
      <div className="flex items-center justify-between border-[#D9D9D9] border-b px-5 py-3.5">
        <input
          className="font-bold text-sm leading-none outline-none"
          placeholder={t('title_placeholder')}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeydown}
        />

        <button type="button" onClick={() => setFavorite((f) => !f)}>
          <Favorite className={cn(!favorite && 'fill-none')} />
        </button>
      </div>

      <div className="px-5 pt-3.5 pb-1">
        <textarea
          className="min-h-16 w-full resize-none overflow-y-hidden text-sm leading-none outline-none"
          placeholder={t('description_placeholder')}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          onKeyDown={handleKeydown}
        />
      </div>

      <div className="flex h-10 items-center justify-end px-5">
        {title && (
          <div className="border-2 border-[#4F4F4D]/80 p-1 font-medium text-[#4F4F4D]/80 text-xs leading-none">
            {t('submit_hint_text')}
          </div>
        )}
      </div>
    </div>
  )
}
