import { TodoContext } from '@/context/TodoContext'
import { useContext } from 'react'

const useTodo = () => useContext(TodoContext)

export default useTodo
