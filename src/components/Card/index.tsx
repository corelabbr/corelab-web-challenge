'use client'

import { TodoType, TodoUpdaterType } from '@/types/Todo'
import styles from './Card.module.scss'
import { useEffect, useState } from 'react'
import CardHeader from './CardHeader'
import CardDescription from './CardDescription'
import CardFooter from './CardFooter'
import Colors from '@/types/Colors'
import todoHook from '@/hooks/todoHook'

type CardProps = {
  todo: TodoType
}

function Card({ todo: { id, title, description, color, favorite } }: CardProps) {
  const { deleteTodo, updateTodo, changeColor, toggleFavoriteTodo } = todoHook()
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [modified, setModified] = useState(false)
  const [cardColorClass, setCardColorClass] = useState<string>(Colors[color])
  const [todo, setTodo] = useState<TodoUpdaterType>({
    title,
    description,
    color,
    favorite,
  })

  useEffect(() => {
    const updater = async () => {
      if (!isEditing && modified) {
        setModified(false)
        const newTodo = await updateTodo(todo, id)
        if (newTodo)
          setTodo((prev) => ({ ...prev, titl: prev.title, description: prev.description }))
      }
    }
    updater()
  }, [isEditing])

  useEffect(() => {
    setCardColorClass(getColor())
  }, [todo])

  const handleTodoContent = (value: boolean | string, key: keyof typeof todo) => {
    setTodo((prev) => ({ ...prev, [key]: value }))
    setModified(true)
  }

  const handleToggleFavorite = async () => {
    const newTodo = await toggleFavoriteTodo(id)
    if (newTodo) setTodo(newTodo)
  }

  const handleIsOpen = () => setIsOpen((prev) => !prev)

  const handleIsEditing = () => {
    setIsEditing((prev) => !prev)
  }

  const getColor = (): string => {
    if (todo.color in Colors) {
      return Colors[todo.color as keyof typeof Colors]
    }
    return ''
  }

  const onSelectColor = async (color: string) => {
    setTodo((prev) => ({ ...prev, color: color as keyof typeof Colors }))
    setIsOpen(false)
    await changeColor(color, id)
  }

  return (
    <div
      className={`${styles.container} ${styles[cardColorClass]} ${todo.favorite ? styles.favorite : ''}`}
    >
      <div className={styles.content}>
        <CardHeader
          handleToggleFavorite={handleToggleFavorite}
          handleTodoContent={handleTodoContent}
          isEditing={isEditing}
          favorite={todo.favorite}
          title={todo.title}
          colorDefault={todo.color == 'COLOR_DEFAULT'}
        />
        <CardDescription
          isEditing={isEditing}
          description={todo.description}
          handleTodoContent={handleTodoContent}
        />
        <CardFooter
          isEditing={isEditing}
          bucketOnClick={handleIsOpen}
          pencilOnClick={handleIsEditing}
          isOpen={isOpen}
          deleteOnClick={() => deleteTodo(id)}
          updateTodoColor={onSelectColor}
        />
      </div>
    </div>
  )
}

export default Card
