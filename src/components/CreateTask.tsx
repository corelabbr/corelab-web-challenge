import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';

interface NoteProps {
  onUpdateData: () => void;
}
const Note: React.FC<NoteProps> = ({ onUpdateData }) => {
 const [isStarred, setStarred] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const token = localStorage.getItem('token');

  const toggleStar = () => {
    setStarred(!isStarred);
  };

  const saveNote = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/task/create`,
        {
          title: title,
          description: description,
          color: '#FFFFFF',
          favorite: isStarred,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
   onUpdateData();
      console.log('Nota salva com sucesso:', response.data);
    } catch (error) {
      console.error('Erro ao salvar a nota:', error);
    }
  };

  return (
    <NoteContainer>
      <NoteHeader>
        <NoteTitle>
          <InputTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
          />
          <StarIcon onClick={toggleStar} isStarred={isStarred} />
        </NoteTitle>
        <LineSeparator />
      </NoteHeader>
      <NoteDescription>
        <InputDescription
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Criar nota..."
        />
      </NoteDescription>
      <SaveButton onClick={saveNote}>Salvar</SaveButton>
    </NoteContainer>
  );
};

interface StarIconProps {
  isStarred: boolean;
}

const SaveButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
`;

const NoteContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin: 10px auto;
  width: 100%;
  width: 530.519px;
  background-color: #fff;

  @media screen and (max-width: 412px) {
    width: 80%; 
  }
`;

const NoteHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoteTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  display: flex;
  align-items: center;
`;

const InputTitle = styled.input`
  font-size: 18px;
  padding: 8px;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 472px;
`;

const StarIcon = styled(FaStar)<StarIconProps>`
  color: ${(props) => (props.isStarred ? '#ffd700' : '#ccc')};
  margin-left: 8px;
  cursor: pointer;
`;

const LineSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 8px 0;
  opacity: 0.3;
`;

const NoteDescription = styled.div`
  margin: 8px 0;
`;

const InputDescription = styled.textarea`
  width: 100%;
  height: 37px;
  padding: 8px;
  border: none;
  border-radius: 4px;
`;

export default Note;
