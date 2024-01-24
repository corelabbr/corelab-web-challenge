/* eslint-disable react/prop-types */
import { useState } from 'react'

import starIcon from '../images/star.png'
import yellowStarIcon from '../images/yellowStar.png'
import axios from 'axios'

type CreateNoteProps = {
  title: string
  description: string
  color: string
  isFavorite: boolean
}
const NewItem = () => {
  const containerStyles =
    'w-full px-[12%] lg:px-[0%] xl:px-[0%] 2xl:px-[0%] flex justify-center'
  const cardStyles =
    'bg-white text-black mt-5 rounded-[25px] lg:rounded-[3px] xl:rounded-[3px] 2xl:rounded-[3px] w-[730.52px] flex-col items-center shadow-md p-4'
  const inputContainerStyles = 'flex'
  const inputStyles =
    'flex-1 outline-none font-bold text-base placeholder:text-black'
  const favoriteButtonStyles = 'transition duration-500 ease-in-out'
  const hrStyles = 'mt-2 mb-1'
  const textareaStyles = 'h-[95px] outline-none w-full'

  const [isFavorite, setIsFavorite] = useState(false)
  const toggleIsFavorite = () => {
    setIsFavorite((prevState) => !prevState)
  }
  const [noteTitle, setNoteTitle] = useState('')
  const [noteDescription, setNoteDescription] = useState('')

  // Fuctions
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(event.target.value)
  }
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setNoteDescription(event.target.value)
  }
  const handleBlurTextArea = async (
    event: React.FocusEvent<HTMLTextAreaElement>,
  ) => {
    create({
      title: noteTitle,
      description: event.target.textContent || noteDescription,
      isFavorite,
      color: '#fff',
    })
  }

  const create = async (props: CreateNoteProps) => {
    try {
      const response = await axios.post(
        `http://localhost:3333/task/createTask`,
        {
          title: props.title,
          description: props.description,
          isFavorite: props.isFavorite,
          color: props.color,
        },
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <div className={inputContainerStyles}>
          <input
            type="text"
            value={noteTitle}
            onChange={handleInputChange}
            className={inputStyles}
            placeholder="Título"
          />
          <button onClick={toggleIsFavorite} className={favoriteButtonStyles}>
            {isFavorite ? (
              <img src={yellowStarIcon} alt="yellowStar" />
            ) : (
              <img src={starIcon} alt="star" />
            )}
          </button>
        </div>
        <hr className={hrStyles} />
        <textarea
          onBlur={handleBlurTextArea}
          className={textareaStyles}
          value={noteDescription}
          onChange={handleTextAreaChange}
          placeholder="Criar nota..."
          rows={10}
          cols={30}
        ></textarea>
      </div>
    </div>
  )
}

export default NewItem
