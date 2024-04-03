import useFetch from "react-fetch-hook"
import AppHeader from "./components/AppHeader"
import CreateNote from "./components/CreateNote"
import Note from "./components/Note"
import Task from "./entities/Task"

const App = () => {

    const { isLoading, data, error } = useFetch<Array<Task>>('http://localhost:3333/api/tasks')

    return (
        <div className="bg-slate-50 h-screen">
            <AppHeader/>
            <div className="p-8 space-y-8">
                <div className="w-full flex justify-center">
                    <CreateNote/>
                </div>
                <div className="-m-8 flex flex-wrap justify-center">
                    {data?.map((task) => (
                        <div className="m-4">
                            <Note/>
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