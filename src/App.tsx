import AppHeader from "./components/AppHeader"
import CreateNote from "./components/CreateNote"
import Note from "./components/Note"

const App = () => {
    return (
        <div className="bg-slate-50 h-screen">
            <AppHeader/>
            <div className="p-8 space-y-8">
                <div className="w-full flex justify-center">
                    <CreateNote/>
                </div>
                <div>
                    <Note/>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default App