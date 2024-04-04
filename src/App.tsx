import useFetch from "react-fetch-hook"
import AppHeader from "./components/AppHeader"
import CreateNote from "./components/CreateNote"
import Note from "./components/Note"
import Task from "./entities/Task"
import { useEffect, useState } from "react"
import { safe_url } from "./utils/url"

const App = () => {

    const { isLoading, data, error } = useFetch<Array<Task>>(safe_url(import.meta.env.VITE_API_URL) + '/api/tasks')
    const [tasks, setTasks] = useState(data)

    const favorites = tasks?.filter(task => task.favorite)
    const other = tasks?.filter(task => !task.favorite)

    useEffect(() => {
        setTasks(data)
    }, [data])

    function updateTask(task : Task) {
        if (tasks) {
            const oldTask = tasks?.find(({ id }) => id == task.id)
            if (oldTask) {
                const index = tasks?.indexOf(oldTask)
                console.log(index)
                if (index != undefined) {
                    const newTasks = [...tasks]
                    newTasks[index] = task
                    setTasks(newTasks)
                }
            }
        }
    }

    function removeTask(id : string) {
        setTasks(tasks?.filter(task => task.id != id))
    }

    function addTask(task : Task) {
        setTasks([task, ...tasks ?? []])
    }

    return (
        <div className="bg-slate-50 h-screen">
            <AppHeader/>
            <div className="p-8 space-y-8">
                <div className="w-full flex justify-center">
                    <CreateNote addTask={addTask}/>
                </div>
                <div className="font-bold text-gray-400">Favoritas</div>
                <div className="-m-8 flex flex-wrap justify-center">
                    {favorites?.map((task) => (
                        <div className="m-4" key={task.id}>
                            <Note task={task} removeTask={removeTask} updateTask={updateTask}/>
                        </div>
                    ))}
                </div>
                <div className="font-bold text-gray-400">Outras</div>
                <div className="-m-8 flex flex-wrap justify-center">
                    {other?.map((task) => (
                        <div className="m-4" key={task.id}>
                            <Note task={task} removeTask={removeTask} updateTask={updateTask}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default App