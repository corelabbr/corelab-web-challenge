import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

import Navbar from '../src/components/navbar/Navbar'
import PostCard from '../src/components/cards/PostCard'
import NoteCard from '../src/components/cards/NoteCard'
import Container from '../src/components/container/Container'
import EditNote from '../src/components/editNote/EditNote'

const PostContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
`

const NotesContainer = styled.div`
  width: 100%;
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  margin-bottom: 50px;

  @media (max-width: 1700px) {
    grid-template-columns: repeat(2,1fr);
  }

  @media (max-width: 1100px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const Text = styled.p`
  margin: 0 0 20px 20px;

  @media (max-width: 1100px) {
    text-align: center;
  }
`

function HomePage() {
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { reset, ...formMethods } = useForm()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:3333/notes')
        setNotes(response.data)
      } catch (error) {
        console.error('Erro ao buscar notas:', error)
      }
    }

    fetchNotes()
  }, [])

  const handleDeleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:3333/notes/${noteId}`)
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId))
    } catch (error) {
      console.error('Erro ao excluir a nota:', error)
    }
  }

  const handleEditNote = (noteId) => {
    setEditingNote(noteId)
  }

  const handleSaveEdit = async (editedTitle, editedNote) => {
    try {
      await axios.put(`http://localhost:3333/notes/${editingNote}`, {
        title: editedTitle,
        note: editedNote,
      })

      const response = await axios.get('http://localhost:3333/notes');
      setNotes(response.data)
    } catch (error) {
      console.error('Erro ao editar a nota:', error)
    }

    setEditingNote(null)
  }

  const handlePostSubmit = async (title, note, isImage) => {
    try {
      const response = await axios.post('http://localhost:3333/notes', {
        title,
        note,
        color: '#fff',
        isFavorite: isImage
      })

      setNotes((prevNotes) => [...prevNotes, response.data])

      reset()
    } catch (error) {
      console.error('Erro ao enviar a nota para o banco de dados:', error)
    }
  }

  const handleUpdateColor = (noteId, newColor) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === noteId ? { ...note, color: newColor } : note
      )
    );
  }

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);

    // Filtra as notas com base no valor de pesquisa
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredNotes(filtered);
  };

  const hasFavoriteNotes = notes.some((note) => !note.isFavorite)
  const hasNonFavoriteNotes = notes.some((note) => note.isFavorite)

  return (
    <>
      <Navbar onSearch={handleSearch}/>
      <PostContainer>
        <PostCard onSubmit={handlePostSubmit}/>
      </PostContainer>
      <Container>
        {searchTerm && filteredNotes.length === 0 ? (
          <Text>Nenhuma nota encontrada.</Text>
        ) : (
          <>
            {searchTerm ? (
              <NotesContainer>
                {filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    noteId={note._id}
                    title={note.title}
                    note={note.note}
                    isFavorite={note.isFavorite}
                    color={note.color}
                    onDelete={() => handleDeleteNote(note._id)}
                    onEdit={() => handleEditNote(note._id)}
                    onUpdateColor={handleUpdateColor}
                  />
                ))}
              </NotesContainer>
            ) : (
              <>
                {hasFavoriteNotes && <Text>Favoritas</Text>}
                <NotesContainer>
                  {notes
                    .filter((note) => note.isFavorite === false)
                    .map((note) => (
                      <NoteCard
                        key={note._id}
                        noteId={note._id}
                        title={note.title}
                        note={note.note}
                        isFavorite={note.isFavorite}
                        color={note.color}
                        onDelete={() => handleDeleteNote(note._id)}
                        onEdit={() => handleEditNote(note._id)}
                        onUpdateColor={handleUpdateColor}
                      />
                    ))}
                </NotesContainer>

                {hasNonFavoriteNotes && <Text>outras</Text>}
                <NotesContainer>
                  {notes
                    .filter((note) => note.isFavorite === true)
                    .map((note) => (
                      <NoteCard
                        key={note._id}
                        noteId={note._id}
                        title={note.title}
                        note={note.note}
                        isFavorite={note.isFavorite}
                        color={note.color}
                        onDelete={() => handleDeleteNote(note._id)}
                        onEdit={() => handleEditNote(note._id)}
                        onUpdateColor={handleUpdateColor}
                      />
                    ))}
                </NotesContainer>
              </>
            )}
          </>
        )}
      </Container>
      {editingNote && (
        <EditNote
          onClose={() => setEditingNote(null)}
          onSave={handleSaveEdit}
          title={notes.find((note) => note._id === editingNote)?.title}
          note={notes.find((note) => note._id === editingNote)?.note}
        />
      )}
    </>
  )
}

export default HomePage

/*
 <Container>
        {searchTerm && filteredNotes.length === 0 ? (
          <Text>Nenhuma nota encontrada.</Text>
        ) : (
          <NotesContainer>
            {filteredNotes.length > 0
              ? filteredNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    note={note.note}
                    isFavorite={note.isFavorite}
                    onDelete={() => handleDeleteNote(note._id)}
                    onEdit={() => handleEditNote(note._id)}
                  />
                ))
              : notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    title={note.title}
                    note={note.note}
                    isFavorite={note.isFavorite}
                    onDelete={() => handleDeleteNote(note._id)}
                    onEdit={() => handleEditNote(note._id)}
                  />
                ))}
          </NotesContainer>
        )}
      </Container>




      <Container>
        {hasFavoriteNotes && <Text>Favoritas</Text>}
        <NotesContainer>
          {notes
            .filter((note) => note.isFavorite === false)
            .map((note) => (
              <NoteCard 
                key={note._id}
                noteId={note._id}
                title={note.title}
                note={note.note}
                isFavorite={note.isFavorite}
                color={note.color}
                onDelete={() => handleDeleteNote(note._id)}
                onEdit={() => handleEditNote(note._id)}
                onUpdateColor={handleUpdateColor}
              />
          ))}
        </NotesContainer>
      </Container>

      <Container>
        {hasNonFavoriteNotes && <Text>Outras</Text>}
        <NotesContainer>
          {notes
            .filter((note) => note.isFavorite)
            .map((note) => (
              <NoteCard 
                key={note._id}
                noteId={note._id}
                title={note.title}
                note={note.note}
                isFavorite={note.isFavorite}
                color={note.color}
                onDelete={() => handleDeleteNote(note._id)}
                onEdit={() => handleEditNote(note._id)}
                onUpdateColor={handleUpdateColor}
              />
          ))}
        </NotesContainer>
      </Container>
*/