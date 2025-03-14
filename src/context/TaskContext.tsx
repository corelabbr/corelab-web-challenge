import { createContext, ReactNode, useEffect, useState } from 'react'
import { getTask } from '../api/taskApi'
import { NoteProps } from '../components/Note'

type TaskContextType = {
    dataTask: NoteProps[]
    setDataTask: React.Dispatch<React.SetStateAction<NoteProps[]>>
    fetchGetTask: () => void
    search: string
    setSearch: (search: string) => void
}

export const TaskContext = createContext({} as TaskContextType)

type TaskProviderProps = {
    children: ReactNode
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
    const [dataTask, setDataTask] = useState<NoteProps[]>([])
    const [search, setSearch] = useState('')

    const fetchGetTask = async () => {
        const response = await getTask()
        setDataTask(response)
    }

    useEffect(() => {
        fetchGetTask()
    }, [])

    const filteredTasks =
        search.length > 0 ? dataTask.filter(task => task.title.includes(search)) : dataTask

    const contextValue: TaskContextType = {
        dataTask: filteredTasks,
        setDataTask,
        fetchGetTask,
        search,
        setSearch,
    }

    return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
}
