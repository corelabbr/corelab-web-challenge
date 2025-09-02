import type { Note } from '@/app/entities/note'
import { useGetAllNotes } from '@/app/hooks/use-get-all-notes'
import { useSearchParams } from 'react-router'
import { NoteCard } from '../card'
import { LoadingState } from './loading-state'
import styles from './styles.module.scss'

type NotesReduce = {
  favorites: Note[]
  others: Note[]
}

export function NotesList() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search') || ''
  const { data, isLoading } = useGetAllNotes({ search })

  const notes = data?.notes.reduce(
    (acc, current) => {
      if (current.isFavorite) {
        acc.favorites.push(current)
      } else {
        acc.others.push(current)
      }

      return acc
    },
    { favorites: [], others: [] } as NotesReduce,
  )

  if (isLoading) {
    return <LoadingState />
  }

  if (data?.notes.length === 0) {
    return (
      <div className={styles['empty-state']}>
        <p className={styles['empty-empty-text']}>
          No notes yet. Create your first note above!
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {notes?.favorites && notes.favorites.length > 0 && (
        <div className={styles['container-list']}>
          <h2 className={styles['container-list-title']}>Favorites</h2>
          <ul className={styles['notes-list']}>
            {notes?.favorites?.map((item) => (
              <li key={item.id}>
                <NoteCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {notes?.others && notes.others.length > 0 && (
        <div className={styles['container-list']}>
          <h2 className={styles['container-list-title']}>Others</h2>
          <ul className={styles['notes-list']}>
            {notes?.others?.map((item) => (
              <li key={item.id}>
                <NoteCard data={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
