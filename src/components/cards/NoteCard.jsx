import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'

import Line from '../line/Line'
import EditColor from '../editColor/EditColor'

const StyleCard = styled.div`
    width: 390px;
    height: 437.588px;
    border-radius: 25px;
    background: #FFF;
    box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.25);
    padding: 10px 20px;
    word-wrap: break-word;
    display: flex;
    flex-direction: column;

    @media (max-width: 450px) {
        width: 300px;
        height: 360.588px;
    }
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`

const Title = styled.p`
    color: #4F4F4D;
    font-size: 14.2px;
    font-weight: 700;
    line-height: normal;
`

const NoteLine = styled(Line)`
    width: calc(100% + 40px);
    position: relative;
    left: -20px;
`

const ImgsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: auto;
`

const Img = styled.img`
    width: 17.142px;
    height: 17.142px;
    cursor: pointer;
`

const EditAndColors = styled.div`
    display: flex;
    gap: 10px;
`

const ContainerMain = styled.div`
    display: flex;
    flex-direction: column;
`

export default function NoteCard({ noteId, title, note, isFavorite, onDelete, onEdit, onUpdateColor, color }) {
    const [selectedColor, setSelectedColor] = useState('#FFFFFF')
    const [isEditColor, setIsEditColor] = useState(false)

    const handleEditColor = () => {
        setIsEditColor(!isEditColor)
    }

    const handleColorSelect = async (newColor) => {
        handleEditColor()
        if (color !== newColor) {
          try {
            await axios.put(`http://localhost:3333/notes/${noteId}`, { color: newColor });
            onUpdateColor(noteId, newColor);
          } catch (error) {
            console.error('Erro ao atualizar a cor no banco de dados:', error);
          }
        }
    }

  return (
    <ContainerMain>
        <StyleCard style={{ backgroundColor: color }}>
        <TitleContainer>
            <Title>{title}</Title>
            <Img src={isFavorite ? 'vector.png' : 'vector-yellow.png'} />
        </TitleContainer>
        <NoteLine />
        <p>{note}</p>
        <ImgsContainer>
            <EditAndColors>
            <Img src='edit.png' onClick={onEdit} />
            <Img src='color.png' onClick={() => handleColorSelect(color)}/>
            </EditAndColors>
            <Img src='delete.png' onClick={onDelete} />
        </ImgsContainer>
        </StyleCard>
        {isEditColor && <EditColor onSelectColor={handleColorSelect}/>}
    </ContainerMain>
  )
}