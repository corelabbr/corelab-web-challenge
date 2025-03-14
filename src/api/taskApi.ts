import { api } from './api'
import { NoteProps } from '../components/Note'

type CreateNoteProps = {
    title: string
    description: string
    color: string
    isFavorite: boolean
}

export async function getTask() {
    try {
        const response = await api.get('/task')
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.error('Erro na requisição:', error)
    }
}
export async function createTask(props: CreateNoteProps) {
    try {
        const response = await api.post(`/task`, {
            title: props.title,
            description: props.description,
            isFavorite: props.isFavorite,
            color: props.color,
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}

export async function updateTask(props: NoteProps, id: number) {
    try {
        const response = await api.put(`/task/${id}`, {
            title: props.title,
            description: props.description,
            isFavorite: props.isFavorite,
            color: props.color,
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask(id: number) {
    try {
        const response = await api.delete(`/task/${id}`)
        return response
    } catch (error) {
        console.log(error)
    }
}

//task

//api.post(/tasks)
//api.put(/tasks/:id)
//api.delete(/tasks/:id)
//api.get(/tasks)
