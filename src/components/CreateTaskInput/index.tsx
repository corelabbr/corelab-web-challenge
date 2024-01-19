import styles from './CreateTaskInput.module.scss';
import { FavoriteStar } from '../icons';
import { useState } from 'react';
import { z } from 'zod';
import { Task } from '../../types/Task';
import { Colors } from '../../types/Colors';

interface CreateTaskInputProps {
  onTaskCreate: (task: Task) => void;
}

export const taskSchema = z.object({
  title: z.string()
    .min(1, 'O título deve ter pelo menos 1 caractere')
    .max(20, 'O título deve ter no máximo 20 caracteres'),
  body: z.string()
    .min(1, 'O conteúdo deve ter pelo menos 1 caractere')
    .max(500, 'O conteúdo deve ter no máximo 500 caracteres'),
});

const CreateTaskInput = ({ onTaskCreate }: CreateTaskInputProps) => {

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [fav, setFav] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleFavorite = (): void => {
    setFav((value) => !value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      try {
        const task = taskSchema.parse({ title, body });
        handleTaskCreate(task);
      } catch (err) {
        const error = err as z.ZodError;
        handleError(error.issues[0].message);
      }
    }
  };

  const handleTaskCreate = (task: any): void => {
    const taskData = {
      ...task,
      favorited: fav,
      color: Colors.Default,
    }
    onTaskCreate(taskData);
    setTitle('');
    setBody('');
    setFav(false);
  }

  const handleError = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }


  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <input 
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        />
        <button onClick={() => handleFavorite()}>
          <FavoriteStar fill={fav ? '#FFA000' : 'none'} />
        </button>
      </div>
      <div className={styles.Content}>
        <textarea 
          placeholder="Criar nota..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      </div>
      {error ? <p className={styles.Error}>{error}</p> : null}
    </div>
  );
};

export default CreateTaskInput;
