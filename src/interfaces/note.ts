import type { NOTE_COLOR_CLASSNAMES } from '@/constants/note-color-classnames'

export interface Note {
  id: string
  title: string
  description: string
  color: keyof typeof NOTE_COLOR_CLASSNAMES
  favorite: boolean
}
