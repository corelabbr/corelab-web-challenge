import { Star, X } from 'lucide-react'
import styles from './CreateTodoCard.module.scss'
import { useForm } from 'react-hook-form'
import { CreateTodoModel } from 'types/models/TodoModel'
import { useState } from 'react'
import { TextField } from 'components/shared/TextField'
import { PickColor } from 'components/shared/PickColor'
import { useWindowDimensions } from 'hooks/useWindowResize'
import { todoService } from 'services/http/todoService'
import { Todo } from 'types/Todo'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { todoSchemaValidation } from 'utils/schemaValidation/todoSchema'

interface CreateTodoCardProps {
  handleAddTodo: (todo: Todo) => void
}

export function CreateTodoCard({ handleAddTodo }: CreateTodoCardProps) {
  const [creating, setCreating] = useState(false)
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<CreateTodoModel>({
    defaultValues: {
      color: '#fff'
    },
    resolver: zodResolver(todoSchemaValidation)
  })
  const isFavorite = watch('isFavorite')
  const color = watch('color')
  const { width: windowWitdh } = useWindowDimensions()
  const [error, setError] = useState('')

  const onCreateTodo = async (data: CreateTodoModel) => {
    setError('')
    try {
      const todo = await todoService.createTodo({
        ...data,
        color
      })

      handleAddTodo(todo)
      setCreating(false)
      reset()
    } catch (err: any) {
      toast.error(err.message)
    }
  }

  const handleValidateFields = () => {
    const errorMessages = Object.values(errors)
    if (errorMessages.length) {
      setError(errorMessages[0].message || '')
    }
  }

  const handleCloseForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCreating(false)

    setError('')
    reset()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      setCreating(true)
    }
  }

  const StarIcon = () => (
    <button
      onClick={() => setValue('isFavorite', !isFavorite)}
      className={styles.starButton}
      type="button"
      tabIndex={creating ? 0 : -1}
      data-testid="star-btn"
    >
      <Star
        color="#455A64"
        role="button"
        aria-label={`${isFavorite ? 'remover' : 'adicionar'} dos favoritos`}
        fill={isFavorite ? '#FFA000' : color || '#fff'}
        size={26}
      />
    </button>
  )

  return (
    <form
      onSubmit={handleSubmit(onCreateTodo)}
      onClick={() => setCreating(true)}
      onKeyDown={handleKeyDown}
      aria-label="Pressione enter para criar todo"
      tabIndex={0}
      className={styles.Card}
      style={{ background: color }}
    >
      <header className={styles.header} data-iswhite={color === '#fff'}>
        <TextField
          placeholder={creating ? 'Digite o titulo' : 'Titulo'}
          className={styles.editTitle}
          register={register}
          name="title"
          icon={<StarIcon />}
          tabIndex={creating ? 0 : -1}
          data-testid="title"
        />
      </header>
      <div className={styles.content}>
        {creating ? (
          <textarea
            placeholder="Digite a descrição"
            className={styles.editDescription}
            {...register('description')}
          ></textarea>
        ) : (
          <span className={styles.createTodo}>Criar nota...</span>
        )}
        {error && (
          <span data-testid="error" className={styles.error}>
            {error}
          </span>
        )}
      </div>
      {creating && (
        <div className={styles.actionsBox}>
          <div className={styles.submitButtonBox}>
            <button
              data-testid="create_btn"
              onClick={handleValidateFields}
              className={styles.submitButton}
              type="submit"
            >
              CRIAR
            </button>
            <PickColor
              windowWidth={windowWitdh}
              currentColor={color || '#fff'}
              onChangeColor={color => setValue('color', color)}
            />
          </div>
          <button
            className={styles.closeButton}
            onClick={handleCloseForm}
            type="button"
            tabIndex={0}
            aria-label="Fechar criacao do todo"
            data-testid="x-btn"
          >
            <X color="#51646E" />
          </button>
        </div>
      )}
    </form>
  )
}
