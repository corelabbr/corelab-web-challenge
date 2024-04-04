import axios from "axios"
import { FormEvent, useState } from "react"
import Task from "../entities/Task"

const DEFAULT_COLOR = '#ffffff'

interface Props {
    addTask : (task : Task) => void
}

const CreateNote = (props : Props) => {

    const [title, setTitle] = useState('Título')
    const [body, setBody] = useState('')
    const [favorite, setFavorite] = useState(false)

    function resetState() {
        setTitle('Título')
        setBody('')
        setFavorite(false)
    }

    async function onSubmit(e : FormEvent) {
        e.preventDefault()
        const response = await axios.post('http://localhost:3333/api/tasks', {
            title,
            body,
            favorite,
            color : DEFAULT_COLOR
        })
        const task = response.data
        props.addTask(task)
        resetState()
    }

    return (
        <form onSubmit={onSubmit} className="w-[530px] overflow-hidden bg-white rounded-md shadow-md">
            <div className="p-4 flex">
                <input className="placeholder:font-bold placeholder:text-black flex-1 focus:outline-none font-bold" type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Titulo" value={title}/>
                <input type="checkbox" onChange={(e) => setFavorite(e.target.checked)} checked={favorite}/>
            </div>
            <hr />
            <input className="p-4 w-full resize-none focus:outline-none" placeholder="Criar nota..." type="text" onChange={(e) => setBody(e.target.value)} value={body}/>
            <button type="submit"></button>
        </form>
    )
}

export default CreateNote