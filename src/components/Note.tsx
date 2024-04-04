import { useState } from "react"
import Task from "../entities/Task"
import axios from "axios"
import Close from "../icons/Close"
import Pencil from "../icons/Pencil"
import Star from "./Start"
import { safe_url } from "../utils/url"

interface Props {
    task : Task
    removeTask : (id : string) => void
    updateTask : (task : Task) => void
}

const Note = (props : Props) => {

    const [editing, setEditing] = useState(false)

    const [task, setTask] = useState(props.task)

    const {
        id,
        title,
        body,
        favorite,
        color
    } = task

    function update(property : string, value : any) {
        setTask({...task, [property] : value})
    }

    function startEditing() {
        setEditing(true)
    }

    function save() {
        axios.put(safe_url(import.meta.env.VITE_API_URL) + '/api/tasks/' + id, task)
        setEditing(false)
    }

    function toggleFavorite() {
        update('favorite', !favorite)
        props.updateTask({...task, favorite : !favorite})
        axios.put(safe_url(import.meta.env.VITE_API_URL) + '/api/tasks/' + id, {...task, favorite : !favorite})
    }

    function updateColor(e : React.ChangeEvent<HTMLInputElement>) {
        update('color', e.target.value)
        axios.put(safe_url(import.meta.env.VITE_API_URL) + '/api/tasks/' + id, {...task, color : e.target.value})
    }

    function destroy() {
        axios.delete(safe_url(import.meta.env.VITE_API_URL) + '/api/tasks/' + id)
        props.removeTask(id)
    }

    return (
        <div className="w-96 bg-white rounded-3xl shadow-md" style={{backgroundColor : color}}>
            <div className="p-4 flex items-center">
                <input readOnly={!editing} className="bg-transparent file:placeholder:font-bold placeholder:text-black flex-1 focus:outline-none font-bold" type="text" onChange={(e) => update('title', e.target.value)} placeholder="Titulo" value={title}/>
                <Star onChange={toggleFavorite} checked={favorite}/>
            </div>
            <hr />
            <textarea readOnly={!editing} className="bg-transparent p-4 w-full resize-none focus:outline-none" rows={10} placeholder="Clique ou arraste o arquivo para esta arae para fazer upload" onChange={(e) => update('body', e.target.value)} value={body}></textarea>
            <div className="flex flex-row space-x-2 p-4">
                {editing ?
                    <button onClick={save}>
                        Save
                    </button>
                :
                    <button onClick={startEditing}>
                        <Pencil/>
                    </button>
                }
                <input type="color" onChange={updateColor} value={color}/>
                <div className="flex-1"></div>
                <button onClick={destroy}>
                    <Close/>
                </button>
            </div>
        </div>
    )
}

export default Note