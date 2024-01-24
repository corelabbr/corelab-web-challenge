// ThemeContext.tsx

import { createContext, ReactNode, useState } from 'react'

type TaskContextType = {
  isUpdated: boolean
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

export const TaskContext = createContext({} as TaskContextType)

type TaskProviderProps = {
  children: ReactNode
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false)
  const contextValue: TaskContextType = {
    isUpdated,
    setIsUpdated,
  }

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  )
}
