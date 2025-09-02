import styles from '@/view/styles/styles.module.scss'
import { Toaster } from 'sonner'
import { FormNotes } from './view/components/form-notes'
import { Header } from './view/components/header'
import { NotesList } from './view/components/notes-list'

export function App() {
  return (
    <div className={styles.container}>
      <Header />
      <FormNotes />
      <NotesList />
      <Toaster />
    </div>
  )
}
