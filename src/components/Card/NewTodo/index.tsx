'use client'
import styles from './NewTodo.module.scss'
import CardDescription from '../CardDescription'
import CardHeader from '../CardHeader'
import { KeyboardEvent, useState } from 'react'
import { TodoRegisterType } from '@/types/Todo'
import todoHook from '@/hooks/todoHook'

function NewTodo() {
  const { createTodo } = todoHook()
  const [todo, setTodo] = useState<TodoRegisterType>({
    title: '',
    description: '',
    favorite: false,
  })

  const handleTodoContent = (value: boolean | string, key: keyof typeof todo) => {
    setTodo((prev) => ({ ...prev, [key]: value }))
  }

  const handleFavoriteToggle = () => {
    setTodo((prev) => ({ ...prev, favorite: !prev.favorite }))
  }

  const handleTextareOnKeyDown = async (ev: KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.key === "Enter") {
      setTodo({
        title: '',
        description: '',
        favorite: false,
      })
      await createTodo(todo)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <CardHeader
          favorite={todo.favorite}
          colorDefault={true}
          title={todo.title}
          handleTodoContent={handleTodoContent}
          isEditing
          handleToggleFavorite={handleFavoriteToggle}
        />
        <CardDescription
          description={todo.description}
          handleTodoContent={handleTodoContent}
          isEditing
          textareaOnKeyDown={handleTextareOnKeyDown}
        />
      </div>
    </div>
  )
}

export default NewTodo
