'use client'
import styles from './CardList.module.scss'
import Card from '../Card'
import todoHook from '@/hooks/todoHook'
import Skeleton from 'react-loading-skeleton'

type CardListProps = {
  listName: 'others' | 'favorites'
}

function CardList({ listName }: CardListProps) {
  const { todos } = todoHook()
  const selectedTodo = listName === 'others' ? todos.defaults : todos.favorites

  return (
    <section className={styles.list_section}>
      <h3>{listName === 'others' ? 'Outras' : 'Favoritos'}</h3>
      <div className={styles.list}>
        {selectedTodo ? (
          selectedTodo.map((todo) => <Card todo={todo} key={todo.id} />)
        ) : (
          <>
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
            <Skeleton className={styles.skeleton} />
          </>
        )}
      </div>
    </section>
  )
}

export default CardList
