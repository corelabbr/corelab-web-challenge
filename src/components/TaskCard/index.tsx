import { useEffect, useRef, useState } from 'react';
import styles from './TaskCard.module.scss';
import { FavoriteStar } from '../icons';
import { Task } from '../../types/Task';
import TaskCardControls from './task-card-controls';
import { Colors } from '../../types/Colors';
import TaskService from '../../utils/data/task';

interface TaskCardProps {
  task: Task;
  onTaskUpdate: (task: Task) => void;
}

const TaskCard = ({ task: initTask, onTaskUpdate }: TaskCardProps) => {
  const [task, setTask] = useState<Task>(initTask);
  const [fav, setFav] = useState<boolean>(task.favorited);
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      TaskService.updateTask(task);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

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
    TaskService.deleteTask(task.id!);
    onTaskUpdate(task);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (): void => {
    setEditing((value) => !value);
  };

  return (
    <div className={styles.Container} style={{ backgroundColor: task.color }}>
      <div className={styles.Header}>
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
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
