import { useContext, useState, ChangeEvent, useEffect } from 'react'
import { X } from '@phosphor-icons/react'
import Colors from './Colors'
import pencilIcon from '../assets/images/pencilSimple.png'
import paintBucketIcon from '../assets/images/paintBucket.png'
import starIcon from '../assets/images/star.png'
import yellowStarIcon from '../assets/images/yellowStar.png'
import { TaskContext } from '../context/TaskContext'
import { deleteTask, updateTask } from '../api/taskApi'
import './Note.css'

export type NoteProps = {
    id: number
    title: string
    description: string
    color: string
    isFavorite: boolean
}

export const Note = ({ id, title, description, color, isFavorite }: NoteProps) => {
    const [isColorsVisible, setColorsVisible] = useState(false)
    const [isEditable, setIsEditable] = useState(false)
    const [editableTitle, setEditableTitle] = useState(title)
    const [editableDescription, setEditableDescription] = useState(description)

    const { fetchGetTask } = useContext(TaskContext)

    const toggleColorsVisibility = () => setColorsVisible(prevState => !prevState)
    const toggleIsEditable = () => setIsEditable(prevState => !prevState)
    const toggleFavorite = async () => {
        await fetchUpdateTask({
            id,
            title: editableTitle,
            description: editableDescription,
            isFavorite: !isFavorite,
            color: color,
        })
    }
    const selectNoteColor = (color: string) => {
        fetchUpdateTask({
            id,
            title: editableTitle,
            description: editableDescription,
            isFavorite: isFavorite,
            color,
        })
    }
    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(event.target.value)
    }
    const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEditableDescription(event.target.value)
    }
    const handleUpdate = async () => {
        if (isEditable) {
            await fetchUpdateTask({
                id,
                title: editableTitle,
                description: editableDescription,
                isFavorite: isFavorite,
                color: color,
            })
        }
    }
    const fetchUpdateTask = async (props: NoteProps) => {
        const response = await updateTask(props, id)
        console.log('updated', response)
        if (response?.data) {
            fetchGetTask()
        }
    }
    const fetchDeleteTask = async () => {
        const response = await deleteTask(id)
        console.log('deleted', response)
        if (response?.status === 204) {
            fetchGetTask()
        }
    }
    useEffect(() => {
        setEditableTitle(title)
        setEditableDescription(description)
    }, [title])

    return (
        <div className='note-container'>
            <div style={{ backgroundColor: color }} className='note-subcontainer'>
                <div className='note-title-container'>
                    <input
                        type='text'
                        value={editableTitle}
                        onChange={handleTitleChange}
                        onBlur={handleUpdate}
                        className='note-title-input'
                        disabled={!isEditable}
                    />

                    <button onClick={toggleFavorite} className='note-title-button'>
                        {isFavorite ? (
                            <img src={yellowStarIcon} alt='yellowStar' />
                        ) : (
                            <img src={starIcon} alt='star' />
                        )}
                    </button>
                </div>
                <div className={color === '#fff' ? 'note-divider-gray' : 'note-divider-white'} />
                {isEditable ? (
                    <textarea
                        value={editableDescription}
                        onChange={handleDescriptionChange}
                        onBlur={handleUpdate}
                        className='note-description-text-area'
                    />
                ) : (
                    <div className='note-description-text-area-editable'>{editableDescription}</div>
                )}
                <div className='note-bottom-icons-container '>
                    <div className='flex justify-between gap-3 items-center'>
                        <button
                            onClick={toggleIsEditable}
                            className={
                                isEditable
                                    ? 'note-bottom-icon-pencil-editable'
                                    : 'note-bottom-icon-pencil'
                            }
                        >
                            <img src={pencilIcon} alt='pencilSimple' />
                        </button>
                        <button
                            onClick={toggleColorsVisibility}
                            className={
                                isColorsVisible
                                    ? 'note-bottom-icon-paintBucket-editable'
                                    : 'note-bottom-icon-paintBucket'
                            }
                        >
                            <img src={paintBucketIcon} alt='paintBucket' />
                        </button>
                    </div>
                    <div className='note-bottom-icon-close-container'>
                        <button onClick={fetchDeleteTask}>
                            <X size={20} weight='bold' className='note-bottom-icon-close-button' />
                        </button>
                    </div>
                    {isColorsVisible && (
                        <Colors onSelectColor={selectNoteColor} onClose={toggleColorsVisibility} />
                    )}
                </div>
            </div>
        </div>
    )
}
