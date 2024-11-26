import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import useSWR from 'swr'
import { PopUpContext } from '../context/useContextPopUp'

import CreateNote from '../components/notes/CreateNote'
import NavBar from '../components/navbar/Navbar'
import Note from '../components/notes/Note'
import PopUpMessage from '../components/popupmessage/PopUpMessage'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: rgba(240, 242, 245, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 0px;
  overflow-x: auto;
  gap: 60px;
`
const NoteList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 25px;
`
const FavoriteList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`
const TitleList = styled.h2`
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.52px;
  text-align: left;
  padding: 6px 0;
  color: rgba(70, 70, 70, 1);
  position: absolute;
  left: 10%;
  transform: translateY(-110%);

  @media (min-width: 2000px) {
    left: 15%;
  }
  @media (min-width: 2560px) {
    left: 23%;
  }
`
const ScreenLoading = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e4e4e4;
  font-size: 24px;
`
const fetcher = async (url) => {
  const response = await axios.get(url)
  return response.data
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [showPopUp, setShowPopUp, messageType] = useContext(PopUpContext)
  const [searchValue, setSearchValue] = useState('')

  const { data: dataFavoriteNotes, error: errorFavoriteNotes } = useSWR(
    `https://corelab-api-challenge-ryanlucas.vercel.app/getFavoritesNotes`,
    fetcher
  )
  const { data: dataNotes, error: errorNotes } = useSWR(
    `https://corelab-api-challenge-ryanlucas.vercel.app/getNotes`,
    fetcher
  )

  const lowerSearch = searchValue ? searchValue.toLowerCase() : ''

  const filterDataNotes =
    dataNotes && Array.isArray(dataNotes)
      ? dataNotes.filter((note) => note.title.toLowerCase().includes(lowerSearch))
      : []

  const filterDataFavoritesNotes =
    dataFavoriteNotes && Array.isArray(dataFavoriteNotes)
      ? dataFavoriteNotes.filter((note) => note.title.toLowerCase().includes(lowerSearch))
      : []
  useEffect(() => {
    setTimeout(() => {
      setShowPopUp(false)
    }, 2500)

    if (dataFavoriteNotes) {
      setLoading(false)
    }
    if (dataNotes) {
      setLoading(false)
    }
    if (errorFavoriteNotes && errorNotes) {
      setLoading(false)
    }
  }, [dataFavoriteNotes, errorFavoriteNotes, dataNotes, errorNotes])

  if (loading) return <ScreenLoading>Carregando...</ScreenLoading>

  return (
    <>
      {showPopUp && (
        <PopUpMessage error={messageType === 'error' ? true : false}>
          {messageType === 'created' && 'Tarefa criada com sucesso'}
          {messageType === 'createdFile' && 'Arquivo baixado com sucesso'}
          {messageType === 'deleted' && 'Tarefa deletada com sucesso'}
          {messageType === 'deletedFile' && 'Arquivo deletado com sucesso'}
          {messageType === 'edited' && 'Tarefa editada com sucesso'}
          {messageType === 'addFavorites' && 'Tarefa adicionada aos favoritos'}
          {messageType === 'addOthers' && 'Tarefa removida dos favoridos'}
          {messageType === 'error' && 'Algo deu errado'}
        </PopUpMessage>
      )}

      <NavBar onSearchChange={setSearchValue} onCleanInput={setSearchValue} />
      <Container>
        <CreateNote />
        <FavoriteList>
          <TitleList>Favoritos</TitleList>
          {filterDataFavoritesNotes &&
          errorFavoriteNotes === undefined &&
          filterDataFavoritesNotes.length > 0 ? (
            filterDataFavoritesNotes.map((note) => (
              <Note
                key={note._id}
                title={note.title}
                createdDate={note.createdDate}
                text={note.text}
                favorite={note.isFavorite}
                color={note.color}
                file={note.src}
                id={note._id}
              />
            ))
          ) : (
            <h3>Nenhuma tarefa encontrada</h3>
          )}
        </FavoriteList>
        <NoteList>
          <TitleList>Outros</TitleList>
          {filterDataNotes && errorNotes === undefined && filterDataNotes.length > 0 ? (
            filterDataNotes.map((note) => (
              <Note
                key={note._id}
                title={note.title}
                createdDate={note.createdDate}
                text={note.text}
                favorite={note.isFavorite}
                color={note.color}
                file={note.src}
                id={note._id}
              />
            ))
          ) : (
            <h3>Nenhuma tarefa encontrada</h3>
          )}
        </NoteList>
      </Container>
    </>
  )
}
