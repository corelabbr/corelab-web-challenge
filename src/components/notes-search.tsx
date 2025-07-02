'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Favorite } from '@/components/icons/favorite'
import { Search } from '@/components/icons/search'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { NOTE_COLOR_CLASSNAMES } from '@/constants/note-color-classnames'
import { NOTE_COLORS } from '@/constants/note-colors'
import { cn } from '@/helpers/cn'
import { parseAsBoolean } from '@/helpers/parse-as-boolean'
import { parseAsEnum } from '@/helpers/parse-as-enum'
import { useScopedI18n } from '@/locales/client'
import type { UnionArray } from '@/types/union-array'

export function NotesSearch() {
  const t = useScopedI18n('home.notes_search')

  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get('search')
  const favorite = parseAsBoolean(searchParams.get('favorite'))

  const color = parseAsEnum(
    searchParams.get('color'),
    NOTE_COLORS as unknown as UnionArray<typeof NOTE_COLORS>,
  )

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    router.replace('/?' + params.toString())
  }, 300)

  function handleSwitchFavorite() {
    const params = new URLSearchParams(searchParams)

    if (favorite) {
      params.delete('favorite')
    } else {
      params.set('favorite', 'true')
    }

    router.replace('/?' + params.toString())
  }

  function handleSetColor(next: (typeof NOTE_COLORS)[number]) {
    const params = new URLSearchParams(searchParams)

    if (next === color) {
      params.delete('color')
    } else {
      params.set('color', next)
    }

    router.replace('/?' + params.toString())
  }

  return (
    <div className="ml-3 flex flex-1 gap-1 md:ml-5">
      <div className="flex max-w-[32rem] items-center justify-between gap-2.5 rounded-md border border-[#D9D9D9] p-2 shadow-[1px,1px,3px,rgba(0,0,0,0.25)]">
        <input
          className="w-full min-w-0 flex-1 text-ellipsis text-sm leading-none outline-none placeholder:text-[#9A9A9A]"
          placeholder={t('placeholder')}
          defaultValue={search ?? undefined}
          onChange={(event) => handleSearch(event.target.value)}
        />

        <Search />
      </div>

      <button
        type="button"
        className="flex aspect-square h-10 items-center justify-center rounded-md border border-[#D9D9D9]"
        onClick={handleSwitchFavorite}
      >
        <Favorite className={cn('size-5', !favorite && 'fill-none')} />
      </button>

      <Popover>
        <PopoverTrigger className="flex aspect-square h-10 items-center justify-center rounded-md border border-[#D9D9D9]">
          <div
            className={cn(
              'size-5 rounded-full bg-black',
              color && NOTE_COLOR_CLASSNAMES[color],
            )}
          />
        </PopoverTrigger>

        <PopoverContent className="grid grid-cols-6 gap-2.5">
          {NOTE_COLORS.filter((color) => color !== 'white').map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleSetColor(color)}
              className={cn(
                'size-9 rounded-full',
                NOTE_COLOR_CLASSNAMES[color],
              )}
            />
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}
