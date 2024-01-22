import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import ColorModal from './ColorModal';
import Swal from 'sweetalert2';



interface PostCardProps {
  id: number;
  title: string;
  content: string;
  color: string;  
  favorite: boolean;
  onDelete: (id: number) => void;
  onChangeColor: (id: number, color: string) => void;
  onUpdateFavorite: (id: number, isFavorite: boolean) => void;
   onChangeEditPost:(postId: number) => void
}

const PostCard: React.FC<PostCardProps> = ({ id, title, content, color, favorite, onDelete, onChangeColor, onUpdateFavorite, onChangeEditPost }) => {
  const token = localStorage.getItem('token');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);
  const [editedContent, setEditedContent] = useState<string>(content);
  const [isColorModalOpen, setColorModalOpen] = useState(false);



 const handleDeleteClick = () => {
    // Usando o Swal para confirmar a exclusão
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você não será capaz de recuperar esta anotação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, exclua!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/task/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          onDelete(id);
        } catch (error) {
          console.error('Erro ao excluir o post:', error);
        }
      }
    });
  };



  const handleToggleFavorite = () => {
    onUpdateFavorite(id, !favorite);
  };

  const handleEditClick = () => {
   
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleColorChange = () => {
    setColorModalOpen(true);
  };
   const handleColorModalClose = () => {
    setColorModalOpen(false);
  };

   const handleColorSelection = async (selectedColor: string) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/task/${id}`,
      { color: selectedColor },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onChangeColor(id, selectedColor);
    handleColorModalClose();
  } catch (error) {
    console.error('Erro ao atualizar a cor do post:', error);
  }
};


 
  const handleSaveChanges = async () => {
    try {
      const requestData = {
        title: editedTitle,
        ...(editedContent && { description: editedContent }),
      };

      await axios.put(
        `${import.meta.env.VITE_API_URL}/task/${id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onChangeEditPost(id)
      
      setIsModalOpen(false);

    } catch (error) {
      console.error('Erro ao editar o post:', error);
    }
  };

  return (
    <PostContainer style={{backgroundColor:color}}>
      <PostHeader>
        <PostTitle>
          {title}
          <StarIcon onClick={handleToggleFavorite} favorite={favorite} />
        </PostTitle>
      </PostHeader>
      <LineSeparator />
      <PostContent>
        <ContentText>{content}</ContentText>
      </PostContent>
      <PostActions>
        <ActionButtonContainer>
          <LeftActions>
            <ActionButton onClick={handleEditClick}>
              <EditIcon />
            </ActionButton>
             <ActionButton onClick={handleColorChange}>
        <ColorIcon />
            </ActionButton>
           
            
          </LeftActions>
          <RightActions>
            <ActionButton onClick={handleDeleteClick}>
              <img src="./delete.svg" alt="Delete" />
            </ActionButton>
          </RightActions>
        </ActionButtonContainer>
      </PostActions>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <label>
              Titulo:
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </label>
            <label>
              Descrição:
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            </label>
            <ButtonModal save onClick={handleSaveChanges}>
              Salvar Alterações
            </ButtonModal>
            <ButtonModal onClick={handleModalClose}>Cancelar</ButtonModal>
          </ModalContent>
        </Modal>
      )}
       {isColorModalOpen && (
        <ColorModal onColorSelect={handleColorSelection} onClose={handleColorModalClose} />
      )}
    </PostContainer>
  );
};



interface StarIconProps {
  favorite: boolean;
}





const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ButtonModal = styled.button<{ save?: boolean }>`
  background-color: ${(props) => (props.save ? '#4caf50' : '#ccc')};
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }

  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }
`;
const PostContainer = styled.div`
width: 390px;
height: 437.588px;
  padding: 12px;
  margin-top: 10px;
  margin-left:10px;
  max-width: 100%; 
  border-radius: 25px;
  background: #fff;
  box-shadow: 2px 2px 3px 0px rgba(0, 0, 0, 0.25);
  position: relative;

  @media screen and (max-width: 412px) {
    margin-left:0px;
  margin-top: 20px;
      width: 336px;

  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const PostTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  position: relative;
  width: 355px;
`;

const StarIcon = styled(FaStar)<StarIconProps>`
  font-size: 18px;
  color: ${(props) => (props.favorite ? '#FFD700' : '#9E9E9E')};
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
`;

const LineSeparator = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 8px 0;
  opacity: 0.5;
`;

const PostContent = styled.div`
  margin: 8px 0;
`;

const ContentText = styled.p`
  margin: 0;
`;

const PostActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 316px;
`;

const LeftActions = styled.div`
  display: flex;
  align-items: center;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    width: 24px;
    height: 24px;
    margin-left: 8px;
  }
`;

const EditIcon = styled.img.attrs({
  src: "./edit.svg",
  alt: 'Edit',
})`
  width: 24px;
  height: 24px;
`;

const ColorIcon = styled.img.attrs({
  src: "./color.svg",
  alt: 'Color',
})`
  width: 20px;
  height: 20px;
`;

export default PostCard;
