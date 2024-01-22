import { useEffect, useRef, useState } from 'react'
import styles from './TaskCard.module.scss'
import { FavoriteStar } from '../icons'
import { Task } from '../../types/Task'
import TaskCardControls from './task-card-controls'
import { Colors } from '../../types/Colors'
import { useDeleteTask, useUpdateTask } from '../../hooks/useTaskService'
import { taskSchema } from '../CreateTaskInput'
import { ZodError } from 'zod'

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task: initTask }: TaskCardProps) => {
  const [task, setTask] = useState<Task>(initTask)
  const [editing, setEditing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [editing])

  const mutationUpdate = useUpdateTask()
  const mutationDelete = useDeleteTask()

  const onTaskUpdate = (task: Task): void => {
    mutationUpdate.mutate(task)
  }

  const onTaskDelete = (id: string): void => {
    mutationDelete.mutate(id)
  }

  const handleFavorited = (): void => {
    const updatedTask = { ...task, favorited: !task.favorited }
    setTask(updatedTask)
    onTaskUpdate(updatedTask)
  }

  const handleColor = (color: Colors): void => {
    const updatedTask = { ...task, color: color as string }
    setTask(updatedTask)
    onTaskUpdate(task)
  }

  const handleCardDelete = (): void => {
    if (task.id === undefined) return
    onTaskDelete(task.id)
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const validateTaskEdit = (task: Task): void => {
    try {
      taskSchema.parse({ title: task.title, body: task.body })
      onTaskUpdate(task)
      setEditing(false)
    } catch (err) {
      const error = err as ZodError
      handleError(error.issues[0].message)
    }
  }

  const handleEdit = (): void => {
    if (editing) {
      validateTaskEdit(task)
      if (inputRef.current) {
        inputRef.current.focus()
      }
      return
    }
    setEditing((value) => !value)
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      validateTaskEdit(task)
    }
  }

  const handleError = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 3000)
  }

  return (
    <article className={styles.Container} style={{ backgroundColor: task.color }}>
      {error && <div className={styles.Error}>{error}</div>}
      <div className={styles.Header}>
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            onKeyUp={(e) => handleKeyUp(e)}
          />
        ) : (
          <h2>{task.title}</h2>
        )}
        <button onClick={() => handleFavorited()}>
          <FavoriteStar fill={task.favorited ? '#FFA000' : 'none'} />
        </button>
      </div>
      <div className={styles.Content}>
        {editing ? (
          <textarea
            value={task.body}
            onChange={(e) => setTask({ ...task, body: e.target.value.replace(/\n$/, '') })}
            onKeyUp={(e) => handleKeyUp(e)}
          />
        ) : (
          <p>{task.body}</p>
        )}
      </div>
      <TaskCardControls
        handleColor={handleColor}
        handleEdit={handleEdit}
        handleCardDelete={handleCardDelete}
      />
    </article>
  )
}

export default TaskCard
