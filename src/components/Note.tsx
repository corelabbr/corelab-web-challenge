import { useState } from "react"
import Task from "../entities/Task"
import axios from "axios"

interface Props {
    task : Task
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
        axios.put('http://localhost:3333/api/tasks/' + id, task)
        setEditing(false)
    }

    function toggleFavorite() {
        update('favorite', !favorite)
        axios.put('http://localhost:3333/api/tasks/' + id, {...task, favorite : !favorite})
    }

    function updateColor(e : React.ChangeEvent<HTMLInputElement>) {
        update('color', e.target.value)
        axios.put('http://localhost:3333/api/tasks/' + id, {...task, color : color})
    }

    return (
        <div className="w-96 bg-white rounded-3xl shadow-md">
            <div className="p-4 flex">
                <input readOnly={!editing} className="placeholder:font-bold placeholder:text-black flex-1 focus:outline-none font-bold" type="text" onChange={(e) => update('title', e.target.value)} placeholder="Titulo" value={title}/>
                <input type="checkbox" onChange={toggleFavorite} checked={favorite} />
            </div>
            <hr />
            <textarea readOnly={!editing} className="p-4 w-full resize-none focus:outline-none" rows={10} placeholder="Clique ou arraste o arquivo para esta arae para fazer upload" onChange={(e) => update('body', e.target.value)} value={body}></textarea>
            <div className="flex flex-row space-x-2 p-4">
                {editing ?
                    <button onClick={save}>
                        Save
                    </button>
                :
                    <button onClick={startEditing}>
                        Edit
                    </button>
                }
                <input type="color" onChange={updateColor} value={color}/>
                <div className="flex-1"></div>
                <button>X</button>
            </div>
        </div>
    )
}

export default Note