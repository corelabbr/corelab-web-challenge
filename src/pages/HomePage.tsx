import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import PostCard from "../components/PostCard";
import TitleBar from "../components/TitleBar";
import Note from "../components/CreateTask";

interface Post {
  id: number;
  title: string;
  description: string;
  favorite: boolean;
  color: string;
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
const colorMap: Record<string, string> = {
  azul: '#BAE2FF',
  'verde claro': '#B9FFDD',
  amarelo: '#FFE8AC',
  rosa: '#FFCAB9',
  'vermelho claro': '#F99494',
  'azul claro': '#9DD6FF',
  roxo: '#ECA1FF',
  'verde limão': '#DAFF8B',
  laranja: '#FFA285',
  'cinza claro': '#CDCDCD',
  'cinza escuro': '#979797',
  marrom: '#A99A7C',
};
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<Post[]>(
        `${import.meta.env.VITE_API_URL}/task`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const fetchedPosts = response.data;
      const sortedPosts = fetchedPosts.sort((a, b) => (b.favorite ? 1 : -1));

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Erro ao obter as postagens:", error);
    }
  };

  const fetchAndSetData = () => {
    fetchData();
  };

  useEffect(() => {
    fetchAndSetData();

   

   
  }, []);

  const updateFavorite = async (postId: number, newFavoriteValue: boolean) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/task/${postId}`,
        { favorite: newFavoriteValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAndSetData();
    } catch (error) {
      console.error("Erro ao atualizar o favorito:", error);
    }
  };

  const handleChangeColor = (postId: number, color: string) => {
    fetchAndSetData();
  };

  const handleDeletePost = (postId: number) => {
    fetchAndSetData();
  };
 

  const handleEditPost = async (postId: number) => {
    fetchAndSetData();
  };

const handleSearch = async (searchTerm: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get<Post[]>(
      `${import.meta.env.VITE_API_URL}/task`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const fetchedPosts = response.data;

    const colorHex = colorMap[searchTerm.toLowerCase()];

    let filteredPosts: Post[];

    if (colorHex) {
      filteredPosts = fetchedPosts.filter((post) => post.color.toLowerCase() === colorHex.toLowerCase());
    } else {
      filteredPosts = fetchedPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const sortedPosts = filteredPosts.sort((a, b) => (b.favorite ? 1 : -1));

    const colorFilteredPosts = selectedColor
      ? sortedPosts.filter((post) => post.color === selectedColor)
      : sortedPosts;

    setPosts(colorFilteredPosts);
  } catch (error) {
    console.error("Erro ao buscar e filtrar as postagens:", error);
  }
};


 


 return (
  <HomeContainer>
    <TitleBar
      onSearch={(searchTerm) => handleSearch(searchTerm || "")}
    />
    <NoteContainer>
      <Note onUpdateData={fetchAndSetData} />
    </NoteContainer>

    <Feed>
      {posts && posts.length > 0 && (
        <>
          <SectionTitle>Favoritas</SectionTitle>
          <Section>
            {posts
              .filter(
                (post) =>
                  post.favorite && (!selectedColor || post.color === selectedColor)
              )
              .map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.description}
                  favorite={post.favorite}
                  color={post.color}
                  onDelete={handleDeletePost}
                  onChangeColor={handleChangeColor}
                  onUpdateFavorite={updateFavorite}
                  onChangeEditPost={handleEditPost}
                />
              ))}
          </Section>
        </>
      )}

      {posts && posts.length > 0 && (
        <>
          <SectionTitle>Outras</SectionTitle>
          <Section>
            {posts
              .filter(
                (post) =>
                  !post.favorite && (!selectedColor || post.color === selectedColor)
              )
              .map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.description}
                  favorite={post.favorite}
                  color={post.color}
                  onDelete={handleDeletePost}
                  onChangeColor={handleChangeColor}
                  onUpdateFavorite={updateFavorite}
                  onChangeEditPost={handleEditPost}
                />
              ))}
          </Section>
        </>
      )}

      {(!posts || posts.length === 0) && (
        <p>Nenhuma nota encontrada.</p>
      )}
    </Feed>
  </HomeContainer>
);

}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 min-height: 134vh;
  background-color: #f0f2f5;
  margin-top: 59px;
`;

const NoteContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Feed = styled.div`
  display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    width: 87%;
    margin-top: 20px;
  @media screen and (max-width: 412px) {
    flex-flow: column wrap;
    align-items: center;
    flex-direction: row;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-size: 12px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: -20px;
  margin-left: 43px;
  margin-top: 20px;
  @media screen and (max-width: 412px) {
    margin-left: 17px;
    margin-bottom: -40px;
  }
`;

