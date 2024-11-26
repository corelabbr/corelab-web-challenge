import React, { useContext, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import axios from 'axios'
import { useSWRConfig } from 'swr'

import ConfirmDelete from '../confirmdelete/ConfirmDelete'
import { PopUpContext } from '../../context/useContextPopUp'

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}
const FileUploadContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const DropzoneContainer = styled.div`
  border: 2px dotted ${(props) => getColor(props)};
  padding: 20px;
  text-align: center;
  cursor: pointer;
`
const BoxFile = styled.div`
  border: 2px double #3af321;
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  :hover {
    scale: 0.9;
  }
`
const TextContainer = styled.div`
  display: flex;
  padding: 6px;
  align-items: center;
  font-family: sans-serif;
  font-size: 13px;
  color: #474747da;
  justify-content: space-between;
`
const ImgX = styled.img`
  padding: 1px;
  cursor: pointer;
`

export const FileUpload = ({ id, file, children }) => {
  const [showPopUp, setShowPopUp, messageType, setMessageType] = useContext(PopUpContext)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const portCurrent = process.env.PORT

  const { mutate } = useSWRConfig()

  const handleConfirmDelete = () => {
    setConfirmDelete(!confirmDelete)
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept } = useDropzone({
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return

      const formData = new FormData()
      acceptedFiles.forEach((file) => {
        formData.append('file', file)
        formData.append('id', id)
      })

      try {
        const response = await axios.patch(`${portCurrent}/files/editFile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (response.status === 200) {
          mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
          mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
          setShowPopUp(true)
          setMessageType('createdFile')
        }
      } catch (error) {
        console.error('Upload failed', error)
        setMessageType('error')
      }
    }
  })

  const handleDelete = async () => {
    try {
      const response = await axios.patch(`${portCurrent}/files/editFileToDelete`, {
        id,
        src: ''
      })

      if (response.status === 200) {
        mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`)
        mutate(`https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`)
        setConfirmDelete(false)
        setShowPopUp(true)
        setMessageType('deletedFile')
      }
    } catch (err) {
      console.error(err.message)
      setMessageType('error')
    }
  }

  const seeYourFile = () => {
    const fileName = file.split('\\').pop()
    if (file) {
      window.open(`${portCurrent}/seeFile/${fileName}`)
    }
  }
  return (
    <FileUploadContainer>
      {file ? (
        <>
          <TextContainer>
            <p>Clique para ver seu arquivo</p>
            <ImgX onClick={handleConfirmDelete} src="x.png" />
          </TextContainer>
          <BoxFile onClick={seeYourFile}>{children}</BoxFile>
        </>
      ) : (
        <DropzoneContainer {...getRootProps({ isDragActive, isDragAccept })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solte os arquivos aqui..</p>
          ) : (
            <p>Clique ou arraste arquivos aqui para fazer upload</p>
          )}
        </DropzoneContainer>
      )}
      {confirmDelete && (
        <ConfirmDelete isFile onClickDelete={handleDelete} onClickClose={handleConfirmDelete} />
      )}
    </FileUploadContainer>
  )
}
