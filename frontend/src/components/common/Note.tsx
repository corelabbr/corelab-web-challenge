import { useContext, useState } from "react";
import { Container, ContentInput, Icon, Line, NoteBotton, TitleContainer, TitleInput } from "./Note.style";

import { faStar as regularStart } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStart } from "@fortawesome/free-solid-svg-icons";
import Context from "../../context/NoteContext";

interface NoteProps {
  updateData: () => void
}

export default function Note({ updateData }: NoteProps){
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);

  const { newNote } = useContext(Context);

  function handleTitle(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
  }

  function handleContent(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
  }

  function handleFavorite() {
    setFavorite(!favorite);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    newNote({ title, favorite, content });
    if(title != "" && content != "") {
      setTitle("");
      setFavorite(false);
      setContent("");
      await updateData();
    }
  }

  return(
    <Container onSubmit={handleSubmit}>
      <TitleContainer>
        <TitleInput type="text" name="title" placeholder="Título" value={title} onChange={handleTitle}/>
        <Icon 
          icon={favorite ? solidStart : regularStart} 
          onClick={handleFavorite} 
          $iconColor={favorite ? "#FFA000" : "#64767E"}
        />
      </TitleContainer>
      <Line />
      <ContentInput placeholder="Criar nota..." value={content} name="content" onChange={handleContent}/>
      <NoteBotton value="Criar anotação" />
    </Container>
  )
}