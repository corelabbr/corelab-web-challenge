'use client'
import { Note } from '@/types/Note'
import { CreateNoteCard } from './components/CreateNoteCard'
import { NotesGrid } from './components/NotesGrid'
import { useNotesContext } from './hooks/useNotesContext'

export default function Home() {
  const { searchResults: notes } = useNotesContext()

  let favoriteNotes: Note[] = []
  let othersNotes: Note[] = []
  for (const note of notes) {
    if (note.isFavorite) {
      favoriteNotes.push(note)
    } else {
      othersNotes.push(note)
    }
  }

  return (
    <main className="flex flex-col gap-10 px-4 pb-20">
      <section className="self-center">
        <CreateNoteCard />
      </section>
      <section>
        <h1 className="text-xl font-semibold mb-2">Favoritos</h1>
        <NotesGrid notes={favoriteNotes} />
      </section>
      <section>
        <h1 className="text-xl font-semibold mb-2">Outros</h1>
        <NotesGrid notes={othersNotes} />
      </section>
    </main>
  )
}
