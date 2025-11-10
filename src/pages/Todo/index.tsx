import { useCallback, useEffect, useMemo } from 'react'
import { Card } from './components/Card'
import styles from './Todo.module.scss'
import { Todo } from 'types/Todo'
import { todoService } from 'services/http/todoService'
import { UpdateTodoModel } from 'types/models/TodoModel'
import { useWindowDimensions } from 'hooks/useWindowResize'
import { CreateTodoCard } from './components/CreateTodoCard'
import { useLayoutContext } from 'components/layout/context/LayoutContext'
import { useDebounce } from 'hooks/useDebounce'
import { usePagination } from 'hooks/usePagination'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { ChevronLeft, ChevronRight, Frown } from 'lucide-react'
import { Loading } from 'components/shared/Loading'
import { Kind } from 'types/FilterKind'

interface TodoSeparation {
  favorites: Todo[]
  others: Todo[]
}

export function TodoPage() {
  const { width: windowWidth } = useWindowDimensions()
  const { searchTerm, color, kind } = useLayoutContext()
  const { loading, changeParams, params, setData, data } = usePagination({
    fetcher: todoService.listTodo
  })
  const { data: todos, total } = data

  const { favorites, others } = useMemo(() => {
    return todos.reduce(
      (acc, todo) => {
        if (todo.isFavorite && kind !== Kind.others) {
          acc.favorites.push(todo)
        } else if (kind !== Kind.favorite && !todo.isFavorite){
          acc.others.push(todo)
        }
        return acc
      },
      { favorites: [], others: [] } as TodoSeparation
    )
  }, [todos, kind])

  const emptyMessage = useMemo(() => {
    if (todos.length) return ''
    if (searchTerm.length > 2) return `Não existe TODO's para pesquisa '${searchTerm}`
    if (!!color) return `Não existe TODO's com essa cor`
    if (kind !== Kind.none && kind !== Kind.all) return `Não existe TODO's para esse tipo`

    return `Não existe TODO's`
  }, [todos])

  const handleSearchTerm = () => {
    changeParams({
      term: searchTerm
    })
  }
  const searchTermDebounce = useDebounce({ delay: 500, fn: handleSearchTerm })

  useEffect(() => {
    if (color !== null) changeParams({ color, page: 0 })
  }, [color])

  useEffect(() => {
    if (kind !== Kind.none) {
      const kinds = {
        [Kind.others]: false,
        [Kind.favorite]: true,
        [Kind.all]: undefined
      }
      changeParams({
        favorites: kinds[kind],
        page: 0
      })
    }
  }, [kind])

  useEffect(() => {
    if (searchTerm) searchTermDebounce()
  }, [searchTerm])

  const handleChangeTodoData = useCallback(
    async (data: UpdateTodoModel) => {
      try {
        const updatedTodo = await todoService.updateTodo(data)

        setData(
          todos.map(todo => {
            return todo._id === data.id ? updatedTodo : todo
          })
        )
      } catch (err: any) {
        toast.error(err.message)
      }
    },
    [todoService, setData, todos]
  )

  const handleDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await todoService.deleteTodo(id)
        setData(todos.filter(x => x._id !== id))
      } catch (err: any) { 
        toast.error(err.message)
      }
    },
    [todoService, setData, todos]
  )

  const handleAddTodo = (todo: Todo) => {
    setData([...todos, todo])
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className={styles.Todo}>
      <CreateTodoCard handleAddTodo={handleAddTodo} />
      <section className={styles.cardBox}>
        {!todos.length && <div className={styles.emptyMessage}>
          <Frown color="#c4c4c4" size={40} />
          <span>{emptyMessage}</span>
        </div>}
        {!!favorites.length && (
          <div>
            <h3 aria-description='Conjunto de todos marcadas como favoritas' tabIndex={0} className={styles.title}>Favoritas</h3>
            <section role="grid" className={styles.todoGrid}>
              {favorites.map(todo => (
                <Card
                  windowWidth={windowWidth}
                  todo={todo}
                  onChangeData={handleChangeTodoData}
                  onDeleteTodo={handleDeleteTodo}
                  key={todo._id}
                  animationTo='down'
                  kind={kind}
                />
              ))}
            </section>
          </div>
        )}
        {!!others.length && (
          <div>
            <h3 aria-description='Conjunto de todos' role='grid' tabIndex={0} className={styles.title}>Outras</h3>
            <section role="grid" className={styles.todoGrid}>
              {others.map(todo => (
                <Card
                  windowWidth={windowWidth}
                  todo={todo}
                  onChangeData={handleChangeTodoData}
                  onDeleteTodo={handleDeleteTodo}
                  key={todo._id}
                  animationTo='top'
                  kind={kind}
                />
              ))}
            </section>
          </div>
        )}
      </section>
      {total > params.size! && (
        <div className={styles.pagination}>
          <ReactPaginate
            pageCount={Math.ceil(total / params.size!)}
            onPageChange={({selected}) => changeParams({ page: selected})}

            forcePage={params?.page || 0 }
            breakLabel='...'
            marginPagesDisplayed={0}
            pageRangeDisplayed={3}
            nextLabel={<ChevronRight />}
            previousLabel={<ChevronLeft />}
            containerClassName={styles.container}
            pageClassName={styles.page}
            activeClassName={styles.active}
            nextClassName={styles.next}
            previousClassName={styles.previous}
            activeLinkClassName={styles.activeLink}
          />
        </div>
      )}
    </div>
  )
}
