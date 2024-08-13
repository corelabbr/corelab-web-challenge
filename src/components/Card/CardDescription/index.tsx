'use client'
import { KeyboardEventHandler, LegacyRef, useRef } from 'react'
import styles from './CardDescription.module.scss'
import { TodoRegisterType } from '@/types/Todo'

type CardDescriptionProps = {
  description: string
  isEditing: boolean
  handleTodoContent(value: boolean | string, key: keyof TodoRegisterType): void
  textareaOnKeyDown?: KeyboardEventHandler<HTMLTextAreaElement>
}

function CardDescription({
  isEditing,
  description,
  handleTodoContent,
  textareaOnKeyDown,
}: CardDescriptionProps) {
  const textareaRef: LegacyRef<HTMLTextAreaElement> | null = useRef(null)

  return (
    <div className={styles.content_description}>
      <textarea
        placeholder="Criar nota..."
        disabled={description && !isEditing ? true : false}
        ref={textareaRef}
        value={description ?? ''}
        onChange={(ev) => handleTodoContent(ev.currentTarget.value, 'description')}
        onKeyDown={textareaOnKeyDown}
      />
    </div>
  )
}

export default CardDescription
