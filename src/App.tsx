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

    useEffect(() => {
        setTasks(data)
    }, [data])

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
                <div className="-m-8 flex flex-wrap justify-center">
                    {tasks?.map((task) => (
                        <div className="m-4" key={task.id}>
                            <Note task={task} removeTask={removeTask}/>
                        </div>
                    ))}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default App