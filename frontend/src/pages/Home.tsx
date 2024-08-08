import { useContext, useEffect, useState } from "react";
import Note from "../components/common/Note";
import Main from "../components/layouts/Main";
import MainLayout from "../components/layouts/MainLayout";
import Nav from "../components/layouts/Nav";
import Context from "../context/NoteContext";
import Card from "../components/common/Card";
import { CardContainer, Tag, TagContainer, Text } from "./Home.style";

export default function Home(){
  const [ favorites, setFavorites ] = useState<Array<any>>([]);
  const [ others, setOthers ] = useState<Array<any>>([]);
  const { getData, getDataSearch } = useContext(Context);

  useEffect(() => {
    getNotes();
  }, []);

  async function getNotes() {
    setTimeout(() => {})
    const arrayData = await getData();

    setFavorites(arrayData.favoriteNotes);
    setOthers(arrayData.otherNotes);
  }

  async function getSearchNotes(value: string) {
    setFavorites([]);
    setOthers([]);
    const arrayData = await getDataSearch(value);

    setTimeout(() => {
      setFavorites(arrayData.favoriteNotes);
      setOthers(arrayData.otherNotes);
    }, 200)

  }

  async function handleGetData() {
    setFavorites([]);
    setOthers([]);

    setTimeout(async () => {
      getNotes();
    }, 500);
  }

  return (
    <MainLayout>
      <Nav updateData={(value: string) => getSearchNotes(value)} />
      <Main>
        <Note updateData={() => handleGetData()} />
        <TagContainer>
          <Tag>Favoritas</Tag>
        </TagContainer>
        <CardContainer>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <Card
                key={index}
                dId={item._id}
                dTitle={item.title} 
                dFavorite={item.favorite} 
                dColor={item.color} 
                dContent={item.content} 
                updateData={() => handleGetData()}
              />
            ))
          ): (
            <Text>Não há anotações favoritas</Text>
          )}
        </CardContainer>
      
        <TagContainer>
          <Tag>Outros</Tag>
        </TagContainer>
        <CardContainer>
          {others.length > 0 ? (
            others.map((item, index) => (
              <Card
                key={index}
                dId={item._id}
                dTitle={item.title} 
                dFavorite={item.favorite} 
                dColor={item.color} 
                dContent={item.content} 
                updateData={() => handleGetData()}
              />
            ))
          ): (
            <Text>Não há anotações</Text>
          )}
        </CardContainer>
      </Main>
    </MainLayout>
  )
}