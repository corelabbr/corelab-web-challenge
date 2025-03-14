import { useContext, useState } from 'react'

import starIcon from '../assets/images/star.png'
import yellowStarIcon from '../assets/images/yellowStar.png'
import { createTask } from '../api/taskApi'
import { TaskContext } from '../context/TaskContext'
import './NewITem.css'

const NewItem = () => {
    const [isFavorite, setIsFavorite] = useState(false)
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDescription, setNoteDescription] = useState('')
    const { fetchGetTask } = useContext(TaskContext)

    const toggleIsFavorite = () => setIsFavorite(prevState => !prevState)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTitle(event.target.value)
    }
    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNoteDescription(event.target.value)
    }
    const handleAddClick = async () => {
        if (noteTitle !== '' && noteDescription !== '') {
            await createTask({
                title: noteTitle,
                description: noteDescription,
                isFavorite,
                color: '#fff',
            })
            setNoteTitle('')
            setNoteDescription('')
            setIsFavorite(false)
            fetchGetTask()
        }
    }

    return (
        <div className='new-item-container'>
            <div className='new-item-subcontainer'>
                <div className='new-item-title-container'>
                    <input
                        type='text'
                        value={noteTitle}
                        onChange={handleInputChange}
                        className='new-item-title-input'
                        placeholder='Título'
                    />
                    <button
                        onClick={toggleIsFavorite}
                        className='transition duration-500 ease-in-out'
                    >
                        {isFavorite ? (
                            <img src={yellowStarIcon} alt='yellowStar' />
                        ) : (
                            <img src={starIcon} alt='star' />
                        )}
                    </button>
                </div>
                <div className='new-item-divider' />
                <div className='new-item-description-container'>
                    <textarea
                        className='new-item-description-input'
                        value={noteDescription}
                        onChange={handleTextAreaChange}
                        placeholder='Criar nota...'
                        rows={10}
                        cols={30}
                    ></textarea>
                </div>
                <div className='new-item-add-container'>
                    <button type='button' className='new-item-add-button' onClick={handleAddClick}>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewItem
