import React, { useState } from 'react'
import './styles/global.css'
import { NotesData } from './types/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteNotes, getNotes, postNotes, putNotes } from './api'
import CustomInput from './components/input-seach'
import { FaSearch } from 'react-icons/fa'
import InputComponent from './components/input-notes'
import ColorButton from './components/button-color'
import NotesDelete from './components/button-delete'
import NotesEdit from './components/button-edit'
import NotesFavorite from './components/button-favorite'

const App = () => {
  const queryClient = useQueryClient()
  const query = useQuery({ queryKey: ['notes'], queryFn: getNotes })
  const [search, setSearch] = useState('')
  const [isContentVisible, setIsContentVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [editingNote, setEditingNote] = useState<NotesData | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const mutation = useMutation({
    mutationFn: postNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; title?: string; text: string; favorite?: boolean; color?: string }) => putNotes(data.id, {
      title: data.title,
      text: data.text,
      favorite: data.favorite!,
      color: data.color
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
      console.error('Error updating note:', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
    onError: (error) => {
      console.error('Error deleting note:', error)
    },
  })

  const handleDeleteNotes = (id: string) => {
    deleteMutation.mutate(id)
  }

  const handleEditNotes = (note: NotesData) => {
    setEditingNote(note)
    setTitle(note.title)
    setText(note.text)
    setIsFavorite(note.favorite || false)
    setIsContentVisible(false)
  }

  const handleSaveEdit = () => {
    if (editingNote) {
      updateMutation.mutate({ id: editingNote.id, title, text, favorite: isFavorite })
      setEditingNote(null)
      setTitle('')
      setText('')
      setIsFavorite(false)
      setIsContentVisible(false)
    }
  }

  const handleCreateNote = () => {
    mutation.mutate({
      title: title || undefined,
      text: text,
      favorite: isFavorite,
    })
    setTitle('')
    setText('')
    setIsFavorite(false)
    setIsContentVisible(false)
  }

  const handleSearch = (searchQuery: string) => {
    setSearch(searchQuery)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      if (editingNote) {
        handleSaveEdit()
      } else {
        handleCreateNote()
      }
    }
  }

  const handleButtonClick = () => {
    setIsContentVisible(prevState => !prevState)
  }

  const handleFavoriteToggle = (note: NotesData) => {
    updateMutation.mutate({
      id: note.id,
      favorite: !note.favorite,
      text: note.text
    })
  }

  const handleColorChange = (note: NotesData, newColor: string) => {
    updateMutation.mutate({
      id: note.id,
      color: newColor,
      text: note.text,
      favorite: note.favorite
    })
  }

  const filterNotes = (notes: NotesData[], query: string) => {
    if (!query) return notes

    const lowerQuery = query.toLowerCase()

    return notes.filter(note =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.text.toLowerCase().includes(lowerQuery)
    )
  }

  const colorMapping = {
    red: 'rgba(249, 148, 148, 1)',
    green: 'rgba(218, 255, 139, 1)',
    white: 'rgba(217, 217, 217, 1)',
    blue: 'rgba(0, 166, 255, 1)',
    yellow: 'rgba(255, 255, 0, 1)',
  }

  const filteredNotes = filterNotes(query.data || [], search)

  return (
    <div className='flex flex-col items-center px-4 sm:px-6 lg:px-8'>
      <div className='bg-white flex items-center w-full h-[3.5625rem] border-b border-borderGray px-4'>
        <img
          src='/image/paste.png'
          alt='Logo'
          className='w-[2rem] h-[2rem] mr-2'
        />
        <p className='flex font-bold text-lg mr-4'>CoreNotes</p>
        <div className='flex-1'>
          <CustomInput
            placeholder="Pesquisar notas..."
            onChange={(e) => handleSearch(e.target.value)}
            className='w-full max-w-lg flex items-center pl-3 pr-2 border rounded-lg border-borderGray'
          >
            <FaSearch className='text-cleanGrey mr-2' />
          </CustomInput>
        </div>
      </div>
      <div
        className='flex flex-col bg-white border-1 rounded-sm w-full max-w-[33.125rem] h-[12.6875rem] mt-[2.5625rem] p-4'
        tabIndex={0}
      >
        <div className='relative flex justify-between h-[3rem] w-full border-b border-notesb border-1'>
          <InputComponent
            className='font-inter text-[1rem] font-bold leading-[1.25rem] text-left'
            placeholder='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {!editingNote && (
            <NotesFavorite
              isFavorite={isFavorite}
              onClick={() => setIsFavorite(prev => !prev)}
            />
          )}
        </div>
        <InputComponent
          as='textarea'
          className='h-[6.8125rem] focus:border-none focus:ring-0'
          placeholder="Criar nota..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className='flex flex-wrap mt-4 p-[3.125rem]'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-[1.5rem]'>
          {filteredNotes.map((notes: NotesData) => (
            <li
              className='relative w-full h-auto sm:w-[24.375rem] sm:h-[27.3125rem] rounded-2xl p-6 flex flex-col'
              key={notes.id}
              style={{ backgroundColor: colorMapping[notes.color] }}
            >
              <h1 className='font-inter text-[1rem] font-bold leading-[1.25rem] text-left border-b pb-2'>{notes.title}</h1>
              <p className='font-inter mt-4'>{notes.text}</p>
              {!editingNote && (
                <div className="absolute top-0 right-0">
                  <NotesFavorite
                    isFavorite={notes.favorite}
                    onClick={() => handleFavoriteToggle(notes)}
                  />
                </div>
              )}
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {!editingNote && (
                    <>
                      <NotesEdit onClick={() => handleEditNotes(notes)} />
                      <ColorButton
                        onChange={(color) => handleColorChange(notes, color)}
                        ariaLabel="Change Color"
                      />
                    </>
                  )}
                </div>
                {!editingNote && <NotesDelete onClick={() => handleDeleteNotes(notes.id)} />}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App