import { X } from '@phosphor-icons/react'
import react, { useContext, useState } from 'react'

import Colors from './Colors'
import pencilIcon from '../images/pencilSimple.png'
import paintBucketIcon from '../images/paintBucket.png'
import starIcon from '../images/star.png'
import yellowStarIcon from '../images/yellowStar.png'
import { TaskContext } from '../context/TaskContext'
import axios from 'axios'

export type NoteProps = {
  id: number
  title: string
  description: string
  color: string
  isFavorite: boolean
}

const Note = ({ id, title, description, color, isFavorite }: NoteProps) => {
  // useState
  const [isColorsVisible, setColorsVisible] = useState(false)
  const [favorite, setFavorite] = useState(isFavorite)
  const [isEditable, setIsEditable] = useState(false)
  const noteColor = color
  const noteTitle = title
  const noteDescription = description

  // useContext
  const { isUpdated, setIsUpdated } = useContext(TaskContext)

  // Functions
  const toggleColorsVisibility = () =>
    setColorsVisible((prevState) => !prevState)
  const toggleIsEditable = () => setIsEditable((prevState) => !prevState)
  const toggleFavorite = () => {
    setFavorite((prevState) => !prevState)
    updateValue({
      id,
      title: noteTitle,
      description: noteDescription,
      isFavorite: !favorite,
      color: noteColor,
    })
  }
  const selectNoteColor = (selectedColor: string) => {
    updateValue({
      id,
      title: noteTitle,
      description: noteDescription,
      isFavorite: favorite,
      color: selectedColor,
    })
  }
  const closeColors = () => setColorsVisible(false)

  const handleBlurDescription = async (
    event: React.FocusEvent<HTMLDivElement>,
  ) => {
    if (isEditable) {
      updateValue({
        id,
        title: noteTitle,
        description: event.target.textContent || noteDescription,
        isFavorite: favorite,
        color: noteColor,
      })
    }
  }

  const handleBlurTitle = async (event: React.FocusEvent<HTMLDivElement>) => {
    if (isEditable) {
      updateValue({
        id,
        title: event.target.textContent || noteTitle,
        description: noteDescription,
        isFavorite: favorite,
        color: noteColor,
      })
    }
  }

  const updateValue = async (props: NoteProps) => {
    try {
      const response = await axios.post(
        `http://localhost:3333/task/editTask/${id}`,
        {
          title: props.title,
          description: props.description,
          isFavorite: props.isFavorite,
          color: props.color,
        },
      )

      if (response.data) {
        setIsUpdated(!isUpdated)
      }

      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const noteContainerStyles = 'flex flex-col mt-4'
  const noteStyles = `flex gap-4 text-black mt-2 rounded-[25px] px-[0%] w-[360px] h-[437px] flex-col shadow-md p-4`
  const noteInnerStyles = 'flex px-6'
  const noteTitleStyles = 'outline-none flex-1 font-bold text-base text-black'
  const favoriteButtonStyles = 'transition duration-500 ease-in-out'
  const noteDescriptionStyles = 'px-6 outline-none w-full flex-1 text-zinc-400'
  const noteButtonsContainerStyles = 'px-6 flex justify-between items-center'
  const noteButtonsStyles = 'flex justify-between gap-3 items-center'
  const pencilButtonStyles = isEditable ? 'bg-[#FFE3B3] rounded-full p-2' : ''
  const paintBucketButtonStyles = isColorsVisible
    ? 'bg-[#FFE3B3] rounded-full p-3'
    : ''

  return (
    <>
      <div className={noteContainerStyles}>
        <div style={{ backgroundColor: noteColor }} className={noteStyles}>
          <div className={noteInnerStyles}>
            <div
              contentEditable={isEditable}
              onBlur={handleBlurTitle}
              className={noteTitleStyles}
            >
              {noteTitle}
            </div>
            <button onClick={toggleFavorite} className={favoriteButtonStyles}>
              {favorite ? (
                <img src={yellowStarIcon} alt="yellowStar" />
              ) : (
                <img src={starIcon} alt="star" />
              )}
            </button>
          </div>
          <hr />
          <div
            onBlur={handleBlurDescription}
            contentEditable={isEditable}
            className={noteDescriptionStyles}
          >
            {noteDescription}
          </div>
          <div className={noteButtonsContainerStyles}>
            <div className={noteButtonsStyles}>
              <button onClick={toggleIsEditable} className={pencilButtonStyles}>
                <img src={pencilIcon} alt="pencilSimple" />
              </button>
              <button
                onClick={toggleColorsVisibility}
                className={paintBucketButtonStyles}
              >
                <img src={paintBucketIcon} alt="paintBucket" />
              </button>
            </div>
            <div>
              <button>
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
        {isColorsVisible && (
          <Colors onSelectColor={selectNoteColor} onClose={closeColors} />
        )}
      </div>
    </>
  )
}

export default Note
