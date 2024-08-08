import { useContext, useState } from "react";
import { Container, TitleInput, ContentInput, FavoriteIcon, TitleContainer, ContentContainer, FooterContainer, Icons, Icon, EditIcon } from "./Card.style";

import { faStar as regularStart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStart, faPen, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import ColorPalette from "./ColorPalette";
import Context from "../../context/NoteContext";

interface CardProp {
  dId: object,
  dTitle: string,
  dFavorite: boolean,
  dColor: string,
  dContent: string,
  updateData: () => void
}

export default function Card({dId, dTitle, dFavorite, dColor, dContent, updateData}: CardProp){
  const [id] = useState<object>(dId);
  const [title, setTitle] = useState<string>(dTitle);
  const [oldTitle, setOldTitle] = useState<string>(dTitle);
  const [content, setContent] = useState<string>(dContent);
  const [oldContent, setOldContent] = useState<string>(dContent);
  const [favorite, setFavorite] = useState<boolean>(dFavorite);
  const [oldFavorite, setOldFavorite] = useState<boolean>(dFavorite);

  const [ editMode, setEditMode ] = useState<boolean>(false);

  const { editNote, deleteNote } = useContext(Context);

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
  }

  function handleFavorite() {
    if(editMode) {
      setFavorite(!favorite);
    }
  }

  async function handleUpdate() {
    if(editMode) {
      await editNote({
        _id: id,
        title,
        oldTitle,
        favorite,
        oldFavorite,
        content,
        oldContent
      });
      setEditMode(false);
      setOldTitle(title);
      setOldFavorite(favorite);
      setOldContent(content);
      await updateData();
    } 
    else {
      const isConfirmed = window.confirm("Tem certeza de que deseja excluir esta anotação?");

      if (isConfirmed) {
        await deleteNote(id);
        await updateData();
      }
    }
  }

  return(
    <Container $color={dColor}>
      <TitleContainer $color={dColor}>
        <TitleInput 
          type="text" 
          name="title" 
          placeholder="Título" 
          value={title} 
          onChange={handleTitle}
          readOnly={!editMode}
        />
        <FavoriteIcon 
          icon={favorite ? solidStart : regularStart} 
          onClick={handleFavorite} 
          $iconColor={favorite ? "#FFA000" : "#64767E"}
        />
      </TitleContainer>
      <ContentContainer>
        <ContentInput 
          placeholder="Clique ou arraste o arquivo para esta área para fazer upload" 
          value={content} 
          onChange={handleContent}
          readOnly={!editMode}
        />
      </ContentContainer>
      <FooterContainer>
        <Icons>
          <EditIcon
            icon={faPen} 
            onClick={() => setEditMode(!editMode)}
            $activate={editMode ? true : false}
          />
          <ColorPalette cardId={dId} updateData={updateData} />
        </Icons>
        <Icon icon={editMode ? faCheck : faXmark } onClick={handleUpdate} />
      </FooterContainer>
    </Container>
  )
}