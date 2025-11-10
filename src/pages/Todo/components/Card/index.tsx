import { Pencil, Star, X } from 'lucide-react'
import styles from './Card.module.scss'
import { Todo } from 'types/Todo'
import { UpdateTodoModel } from 'types/models/TodoModel'
import { useEffect, useReducer, useRef, useState } from 'react'
import { PickColor } from 'components/shared/PickColor'
import { useForm } from 'react-hook-form'
import { TextField } from 'components/shared/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchemaValidation } from 'utils/schemaValidation/todoSchema'
import { Kind } from 'types/FilterKind'

interface CardProps {
  todo: Todo
  onChangeData: (data: UpdateTodoModel) => Promise<void>
  onDeleteTodo: (id: string) => void
  windowWidth: number
  animationTo: 'top' | 'down'
  kind: Kind
}

export function Card({
  todo,
  onChangeData,
  onDeleteTodo,
  windowWidth,
  animationTo,
  kind
}: CardProps) {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<Todo>({
    resolver: zodResolver(todoSchemaValidation)
  })
  const [editingTodo, toggleEditingTodo] = useReducer(state => !state, false)
  const cardRef = useRef<HTMLFormElement | null>(null)
  const offsetAnimation = animationTo === 'top' ? '-15rem' : '15rem'
  const [error, setError] = useState('')

  const handleChangeData = (data: Partial<Todo>) => {
    onChangeData({
      id: todo._id,
      ...data
    })
  }

  const handleSaveChanges = async (data: Todo) => {
    if (editingTodo) {
      onChangeData({
        id: todo._id,
        title: data.title,
        description: data.description
      })
    }
    toggleEditingTodo()
  }

  const handleValidateFields = () => {
    const errorMessages = Object.values(errors)
    if (errorMessages.length) {
      setError(errorMessages[0].message || '')
    }
  }

  const handleToggleFavorite = () => {
    if (kind !== Kind.none && kind !== Kind.all) {
    handleChangeData({ isFavorite: !todo.isFavorite })
    } else {
      cardRef.current?.setAttribute('data-disappear', 'true')
      setTimeout(() => {
        handleChangeData({ isFavorite: !todo.isFavorite })
      }, 300)
    }
  }

  const handleKeyDownFavoriteBtn = (
    e: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (e.key === 'Enter') {
      handleToggleFavorite()
    }
  }

  const handleKeyDownEditing = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter' && editingTodo) {
      handleSaveChanges(getValues())
    }
  }

  const handlePressPencil = (e: React.KeyboardEvent<any>) => {
    if (e.key === 'Enter' && editingTodo) {
      handleValidateFields()
    }
  }

  useEffect(() => {
    setValue('description', todo.description)
    setValue('title', todo.title)
  }, [todo.title, todo.description])

  const StarIcon = () => (
    <button
      onClick={handleToggleFavorite}
      onKeyDown={handleKeyDownFavoriteBtn}
      className={styles.starButton}
      type="button"
      data-testid="star-btn"
    >
      <Star
        color="#455A64"
        aria-label={`${todo.isFavorite ? 'remover' : 'adicionar'} dos favoritos`}
        fill={todo.isFavorite ? '#FFA000' : todo.color}
        size={26}
      />
    </button>
  )

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          '--offset-animation': offsetAnimation,
          overflow: 'hidden',
          padding: 4
        }}
      >
        <div className={styles.pickColor}>
          <PickColor
            windowWidth={windowWidth}
            currentColor={todo.color}
            onChangeColor={color => handleChangeData({ color })}
          />
        </div>
        <form
          onSubmit={handleSubmit(handleSaveChanges)}
          className={styles.Card}
          style={{ background: todo.color }}
          tabIndex={0}
          aria-label="Item para fazer"
          ref={cardRef}
        >
          <header
            className={styles.header}
            data-iswhite={todo.color === '#fff'}
          >
            <TextField
              icon={<StarIcon />}
              className={styles.editTitle}
              placeholder="Digite o titulo"
              disabled={!editingTodo}
              register={register}
              name="title"
              tabIndex={0}
              onKeyDown={handleKeyDownEditing}
              data-testid="title"
            />
          </header>
          <div className={styles.content}>
            <textarea
              className={styles.editDescription}
              {...register('description')}
              disabled={!editingTodo}
              tabIndex={0}
              onKeyDown={handleKeyDownEditing}
            ></textarea>
          </div>
          <span
            data-testid="error"
            style={{ visibility: error ? 'visible' : 'hidden' }}
            className={styles.error}
          >
            {error}
          </span>
          <div className={styles.cardActions}>
            <div className={styles.actionLeft}>
              <button
                className={styles.activeAction}
                style={{ background: editingTodo ? '#ffe3b3' : todo.color }}
                type="submit"
                data-testid="pencil_edit"
                tabIndex={0}
                aria-label="Pressione enter para editar"
                onClick={handleValidateFields}
                onKeyDown={handlePressPencil}
              >
                <Pencil color="#51646E" size={18} />
              </button>
            </div>
            <button
              tabIndex={0}
              onClick={() => onDeleteTodo(todo._id)}
              aria-label="Excluir todo"
              className={styles.removeTodo}
              data-testid="x_btn"
            >
              <X color="#51646E" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
