import { useEffect, useRef, useState } from 'react';
import styles from './TaskCard.module.scss';
import { FavoriteStar } from '../icons';
import { Task } from '../../types/Task';
import TaskCardControls from './task-card-controls';
import { Colors } from '../../types/Colors';
import TaskService from '../../utils/data/task';
import { useDeleteTask, useUpdateTask } from '../../hooks/useTaskService';
import { taskSchema } from '../CreateTaskInput';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task: initTask }: TaskCardProps) => {
  const [task, setTask] = useState<Task>(initTask);
  const [fav, setFav] = useState<boolean>(task.favorited);
  const [editing, setEditing] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const mutationUpdate = useUpdateTask();
  const mutationDelete = useDeleteTask();

  const onTaskUpdate = (task: Task): void => {
    mutationUpdate.mutate(task);
  };

  const onTaskDelete = (id: string): void => {
    mutationDelete.mutate(id);
  };

  const handleFavorited = (): void => {
    const updatedTask = { ...task, favorited: !task.favorited };
    setTask(updatedTask);
    setFav((value) => !value);
    TaskService.updateTask(task);
    onTaskUpdate(updatedTask);
  };

  const handleColor = (color: Colors): void => {
    const updatedTask = { ...task, color: color as string };
    setTask(updatedTask);
    onTaskUpdate(updatedTask);
  };

  const handleCardDelete = (): void => {
    if (task.id === undefined) return;
    onTaskDelete(task.id);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (): void => {
    setEditing((value) => !value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      try {
        taskSchema.parse({ title: task.title, body: task.body });
        onTaskUpdate(task);
        setEditing(false);
      } catch (err) {
        const error = err as any;
        handleError(error.issues[0].message);
      }
    }
  };

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <div className={styles.Container} style={{ backgroundColor: task.color }}>
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
          <FavoriteStar fill={fav ? '#FFA000' : 'none'} />
        </button>
      </div>
      <div className={styles.Content}>
        {editing ? (
          <textarea
            value={task.body}
            onChange={(e) => setTask({ ...task, body: e.target.value })}
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
    </div>
  );
};

export default TaskCard;
