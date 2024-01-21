import styles from './CreateTaskInput.module.scss';
import { FavoriteStar } from '../icons';
import { useState } from 'react';
import { z } from 'zod';
import { Colors } from '../../types/Colors';
import { useAddTask } from '../../hooks/useTaskService';


export const taskSchema = z.object({
  title: z.string()
    .min(1, 'O título deve ter pelo menos 1 caractere')
    .max(20, 'O título deve ter no máximo 20 caracteres'),
  body: z.string()
    .min(1, 'O conteúdo deve ter pelo menos 1 caractere')
    .max(850, 'O conteúdo deve ter no máximo 850 caracteres'),
});

const CreateTaskInput = () => {

  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [fav, setFav] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleFavorite = (): void => {
    setFav((value) => !value);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
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

  const mutation = useAddTask();

  const handleTaskCreate = (task: any): void => {
    const taskData = {
      ...task,
      favorited: fav,
      color: Colors.Default,
    };
    mutation.mutate(taskData);
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
          onChange={(e) => setBody(e.target.value.replace(/\n$/, ''))}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      </div>
      {error ? <p className={styles.Error}>{error}</p> : null}
    </div>
  );
};

export default CreateTaskInput;
