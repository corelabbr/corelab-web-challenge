import styled from 'styled-components'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Line from '../line/Line'

const StyleCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 530.166px;
    height: 100px;
    border-radius: 3px;
    border: 1px solid #D9D9D9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: white;

    @media (max-width: 1100px) {
        width: 340px;
        border-radius: 25px;
        border: 1px solid #D9D9D9;
    }
`

const InputTitle = styled.input`
    width: calc(100% - 30px);
    padding: 5px 15px;
    border: none;

    &::placeholder {
        font-weight: bolder;
        color: black;
    }

    @media (max-width: 1100px) {
        border-radius: 25px 25px 0 0;
        border:  #D9D9D9;
    }
`

const PostTextarea = styled.textarea`
    width: calc(100% - 30px);
    height: 64px;
    padding: 5px 15px;
    border: none;
    resize: none;

    @media (max-width: 1100px) {
        border-radius: 0 0 25px 25px;
        border: 1px solid #D9D9D9;
    }
`

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Image = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;

  @media (max-width: 1100px) {
    margin-right: 5px;
  }
`

export default function PostCard({ onSubmit }) {
    const { register, handleSubmit, reset } = useForm()
    const [isImage, setIsImage] = useState(true)

    const onFormSubmit = (data) => {
        onSubmit(data.title, data.note, isImage)
        reset()
    }

    const handleTextareaKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault()
          handleSubmit(onFormSubmit)()
        }
    }

    const handleClickImage = () => {
      setIsImage(!isImage)
    }

    return (
        <StyleCard>
          <form onSubmit={handleSubmit(onFormSubmit)}>
            <InputContainer>
              <InputTitle
                placeholder='Título'
                {...register('title')}
              />
              <Image
                src={isImage ? 'vector.png' : 'vector-yellow.png'}
                onClick={handleClickImage}
              />
            </InputContainer>
            <Line />
            <PostTextarea
              placeholder='Criar nota...'
              {...register('note')}
              onKeyDown={handleTextareaKeyDown}
            />
            <button type="submit" style={{ display: 'none' }} />
          </form>
        </StyleCard>
      )
    }