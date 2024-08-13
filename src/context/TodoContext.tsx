'use client'
import api from '@/libs/api'
import { TodoFilterType, TodoRegisterType, TodoType, TodoUpdaterType } from '@/types/Todo'
import { AxiosError } from 'axios'
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type TodoContextProps = {
  setFavorites(todos: TodoType[]): void
  setDefaults(todos: TodoType[]): void
  createTodo(todo: TodoRegisterType): Promise<TodoType | null>
  updateTodo(todo: TodoUpdaterType, todoId: string): Promise<TodoType | null>
  changeColor(color: string, todoId: string): Promise<TodoType | null>
  toggleFavoriteTodo(todoId: string): Promise<TodoType | null>
  deleteTodo(todoId: string): Promise<void>
  applyFilters(filter: TodoFilterType): void
  setFilter: React.Dispatch<React.SetStateAction<TodoFilterType>>
  filter: TodoFilterType
  favoriteTodos: TodoType[] | null
  defaultTodos: TodoType[] | null
  todos: AllTodosType
}

type AllTodosType = {
  favorites: TodoType[] | null
  defaults: TodoType[] | null
}

export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps)

export default function TodoProvider({ children }: { children: React.ReactNode }) {
  const [favoriteTodos, setFavoriteTodos] = useState<TodoType[] | null>(null)
  const [defaultTodos, setDefaultTodos] = useState<TodoType[] | null>(null)

  const [filter, setFilter] = useState<TodoFilterType>({
    text: '',
    color: null,
  })

  const [todos, setTodos] = useState<AllTodosType>({
    favorites: favoriteTodos,
    defaults: defaultTodos,
  })

  useEffect(() => {
    setTodos({ favorites: favoriteTodos, defaults: defaultTodos })
  }, [favoriteTodos, defaultTodos])

  useEffect(() => {
    applyFilters()
  }, [filter, favoriteTodos, defaultTodos])

  const applyFilters = () => {
    const filterFn = (todo: TodoType) => {
      const matchTitle = todo.title.trim().toLowerCase().includes(filter.text.trim().toLowerCase())
      const matchColor = filter.color ? todo.color === filter.color : true
      return matchTitle && matchColor
    }

    setTodos({
      favorites: favoriteTodos?.filter(filterFn) || null,
      defaults: defaultTodos?.filter(filterFn) || null,
    })
  }

  const setFavorites = (todos: TodoType[]) => setFavoriteTodos(todos)
  const setDefaults = (todos: TodoType[]) => setDefaultTodos(todos)

  const updateTodoList = (
    updatedTodo: TodoType,
    setList: React.Dispatch<React.SetStateAction<TodoType[] | null>>
  ) => {
    setList(
      (prev) => prev?.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)) || null
    )
  }

  const handleResponseError = (response: AxiosError<string, string>) => {
    toast.error(response.response?.data)
    return false
  }

  const createTodo = async (todo: TodoRegisterType): Promise<TodoType | null> => {
    try {
      const response = await api.post('/todos', todo)

      const newTodo: TodoType = response.data
      if (newTodo.favorite) {
        setFavoriteTodos((prev) => [newTodo, ...prev!])
      } else {
        setDefaultTodos((prev) => [newTodo, ...prev!])
      }
      return newTodo
    } catch (err) {
      handleResponseError(err as AxiosError<string, string>)
    }
    return null
  }

  const updateTodo = async (todo: TodoUpdaterType, id: string): Promise<TodoType | null> => {
    try {
      const response = await api.put(`/todos/${id}`, todo)

      const updatedTodo: TodoType = response.data
      const setList = updatedTodo.favorite ? setFavoriteTodos : setDefaultTodos
      updateTodoList(updatedTodo, setList)
      return updatedTodo
    } catch (err) {
      handleResponseError(err as AxiosError<string, string>)
    }
    return null
  }

  const toggleFavoriteTodo = async (id: string): Promise<TodoType | null> => {
    try {
      const response = await api.put(`/todos/toggle_favorite/${id}`)

      const updatedTodo: TodoType = response.data
      const fromList = updatedTodo.favorite ? setDefaultTodos : setFavoriteTodos
      const toList = updatedTodo.favorite ? setFavoriteTodos : setDefaultTodos

      fromList((prev) => prev?.filter((todo) => todo.id !== id) || null)
      toList((prev) => {
        const updatedList = [updatedTodo, ...(prev || [])]
        updatedList.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        return updatedList
      })

      return updatedTodo
    } catch (err) {
      handleResponseError(err as AxiosError<string, string>)
    }
    return null
  }

  const changeColor = async (color: string, id: string): Promise<TodoType | null> => {
    try {
      const response = await api.put(`/todos/change_color/${id}`, { color })

      const updatedTodo: TodoType = response.data
      const setList = updatedTodo.favorite ? setFavoriteTodos : setDefaultTodos
      updateTodoList(updatedTodo, setList)
      return updatedTodo
    } catch (err) {
      handleResponseError(err as AxiosError<string, string>)
    }
    return null
  }

  const deleteTodo = async (id: string) => {
    try {
      await api.delete(`/todos/${id}`)

      setFavoriteTodos((prev) => prev?.filter((t) => t.id !== id) || null)
      setDefaultTodos((prev) => prev?.filter((t) => t.id !== id) || null)
    } catch (err) {
      handleResponseError(err as AxiosError<string, string>)
    }
  }

  return (
    <TodoContext.Provider
      value={{
        toggleFavoriteTodo,
        deleteTodo,
        updateTodo,
        createTodo,
        favoriteTodos,
        defaultTodos,
        todos,
        setDefaults,
        setFavorites,
        changeColor,
        applyFilters,
        filter,
        setFilter,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
