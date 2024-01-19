import { useState } from 'react';
import styles from './TaskCard.module.scss';
import { FavoriteStar } from '../icons';
import { Task } from '../../types/Task';
import TaskCardControls from './task-card-controls';
import { Colors } from '../../types/Colors';

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const [fav, setFav] = useState<boolean>(false);

  const handleFavorite = (): void => {
    setFav((value) => !value);
  };
  const handleColor = (color: Colors | undefined): void => {
    console.log(color);
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <h2>{task.title}</h2>
        <button onClick={() => handleFavorite()}>
          <FavoriteStar fill={fav ? '#FFA000' : 'none'} />
        </button>
      </div>
      <div className={styles.Content}>
        <p>{task.body}</p>
      </div>
      <TaskCardControls handleColor={handleColor}/>
    </div>
  );
};

export default TaskCard;
