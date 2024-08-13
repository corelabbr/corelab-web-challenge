'use client'
import todoHook from '@/hooks/todoHook'
import { TodoType } from '@/types/Todo'
import { useEffect, useRef } from 'react'

type TodoClientProps = {
  todos: TodoType[]
}

function TodoClient({ todos }: TodoClientProps) {
  const initializer = useRef(false)
  const { setFavorites, setDefaults } = todoHook()

  useEffect(() => {
    if (!initializer.current) {
      setFavorites(todos.filter((t) => t.favorite))
      setDefaults(todos.filter((t) => !t.favorite))
      initializer.current = true
    }
  }, [])

  return null
}

export default TodoClient
