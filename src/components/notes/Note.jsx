import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSWRConfig } from 'swr'
import { PopUpContext } from '../../context/useContextPopUp'

import { Input } from '../form/Input'
import { Button } from '../form/Button'
import Textarea from '../form/Textarea'
import EditPaint from './EditPaint'
import { FileUpload } from '../fileupload/FileUpload'
import ConfirmDelete from '../confirmdelete/ConfirmDelete'

const NoteContainer = styled.div`
  position: relative;
  width: 80%;
  height: 337.59px;
  border-radius: 25px;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    width: 340px;
    height: 430px;
  }
`
const EditingFlex = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`
const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`
const Text = styled.h3`
  font-family: sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 15.73px;
  text-align: left;
  width: 100%;
  padding: 15px 9px;
  cursor: default;
  color: rgba(79, 79, 77, 1);
`

const Title = styled(Text)`
  font-size: 14.2px;
  font-weight: 700;
  text-align: left;
  cursor: default;
  ::placeholder {
    color: rgba(51, 51, 51, 1);
  }
`
const EditingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 15px;
`

const InputTitle = styled(Input)`
  font-size: 14.2px;
  font-weight: 700;
  text-align: left;
  ::placeholder {
    color: rgba(51, 51, 51, 1);
  }
  padding: 10px;
  border-radius: 10px;
  border: ${(props) => (props.isEditing ? '1px solid black' : 'none')};
`
const Img = styled.img`
  padding: 7px;
  cursor: pointer;
  :hover {
    background: #cacaca;
    border-radius: 15px;
  }
`
const ImgPincelAndPaint = styled(Img)`
  padding: 7px;
  border-radius: 15px;
  background: rgba(255, 227, 179, 1);
`

const Barra = styled.div`
  width: 100%;
  border: 1px solid rgba(217, 217, 217, 1);
`
const TextareaEditing = styled(Textarea)`
  width: 90%;
  display: flex;
  padding: 10px;
  height: 100%;
  color: rgba(79, 79, 77, 1);
  border: ${(props) => (props.isEditing ? '1px solid black' : 'none')};
`
const ButtonEditingNote = styled(Button)`
  width: 130px;
`
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`
const FormTextarea = styled(Form)`
  padding-top: 20px;
`
export default function Note({ title, text, favorite, createdDate, file, color, id, ...props }) {
  const [currentFavorite, setCurrentFavorite] = useState(false)
  const [isEditNote, setIsEditNote] = useState(false)
  const [isEditPaint, setIsEditPaint] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [showPopUp, setShowPopUp, messageType, setMessageType] = useContext(PopUpContext)

  const { mutate } = useSWRConfig()
  const { control, handleSubmit } = useForm({
    mode: 'all'
  })

  const EditingNote = () => {
    setIsEditNote(!isEditNote)
  }
  const EditingPaint = () => {
    setIsEditPaint(!isEditPaint)
  }

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }
  const handleSaveEditPaint = () => {
    setIsEditPaint(false)
    mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
    mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://corelab-api-challenge-ryanlucas.vercel.app/deleteNote`,
        {
          data: { id }
        }
      )

      if (response.status === 200) {
        mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
        mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
        setConfirmDelete(false)
        setShowPopUp(true)
        setMessageType('deleted')
      }
    } catch (err) {
      console.error(err.message)
      setMessageType('error')
    }
  }

  const handleEditFavorite = async () => {
    setCurrentFavorite(!currentFavorite)
    const newOther = currentFavorite
    const newFavorite = !currentFavorite

    try {
      const response = await axios.get(
        `https://corelab-api-challenge-ryanlucas.vercel.app/getOneNote?id=${id}`
      )
      const data = response.data

      if (data.isFavorite === true) {
        const responseEdit = await axios.patch(
          `https://corelab-api-challenge-ryanlucas.vercel.app/editFavoriteNote`,
          {
            id,
            isFavorite: newOther
          }
        )

        if (responseEdit.status === 200) {
          mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
          mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
          setShowPopUp(true)
          setMessageType('addOthers')
        }
      } else {
        const responseEdit = await axios.patch(
          `https://corelab-api-challenge-ryanlucas.vercel.app/editFavoriteNote`,
          {
            id,
            isFavorite: newFavorite
          }
        )

        if (responseEdit.status === 200) {
          mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
          mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
          setShowPopUp(true)
          setMessageType('addFavorites')
        }
      }
    } catch (err) {
      console.error(err.message)
      setMessageType('error')
    }
  }

  const onSubmitNote = async (data) => {
    try {
      const response = await axios.patch(
        `https://corelab-api-challenge-ryanlucas.vercel.app/editNote`,
        {
          id,
          title: data.title,
          text: data.text,
          color
        }
      )
      if (response.status === 200) {
        setIsEditNote(false)
        mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
        mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
        setShowPopUp(true)
        setMessageType('edited')
      }
    } catch (err) {
      console.error(err.message)
      setMessageType('error')
    }
  }

  return (
    <NoteContainer {...props} style={{ backgroundColor: String(color) }}>
      <EditingFlex>
        {isEditNote ? (
          <Form onSubmit={handleSubmit(onSubmitNote)}>
            <InputTitle
              name="title"
              control={control}
              defaultValue={title}
              isEditing={isEditNote ? true : false}
            />
          </Form>
        ) : (
          <Title>{title}</Title>
        )}
        {favorite ? (
          <Img onClick={handleEditFavorite} src="estrelaYellow.png" />
        ) : (
          <Img onClick={handleEditFavorite} src="estrela.png" />
        )}
      </EditingFlex>
      <Barra />
      <TextareaContainer>
        {isEditNote ? (
          <FormTextarea onSubmit={handleSubmit(onSubmitNote)}>
            <TextareaEditing
              name="text"
              control={control}
              defaultValue={text}
              isEditing={isEditNote ? true : false}
            />
            <ButtonEditingNote type="submit">Salvar alterações</ButtonEditingNote>
          </FormTextarea>
        ) : (
          <Text>{text}</Text>
        )}
        <FileUpload onClick={id} file={file} id={id}>
          {file}
        </FileUpload>
        <EditingContainer>
          <EditingFlex>
            {isEditNote ? (
              <ImgPincelAndPaint onClick={EditingNote} src="edit.png" />
            ) : (
              <Img onClick={EditingNote} src="edit.png" />
            )}
            {isEditPaint ? (
              <ImgPincelAndPaint onClick={EditingPaint} src="poteTinta.png" />
            ) : (
              <Img onClick={EditingPaint} src="poteTinta.png" />
            )}
          </EditingFlex>
          <Img onClick={handleConfirmDelete} src="x.png" />
          {confirmDelete && (
            <ConfirmDelete onClickDelete={handleDelete} onClickClose={handleConfirmDelete} />
          )}
        </EditingContainer>
      </TextareaContainer>
      {isEditPaint && (
        <EditPaint id={id} title={title} text={text} color={color} onSave={handleSaveEditPaint} />
      )}
    </NoteContainer>
  )
}
