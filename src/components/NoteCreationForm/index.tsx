import { useState } from 'react';
import { FavoriteIcon, SaveIcon } from '../Icons';
import styles from './NoteCreationForm.module.scss';
import Button from '../Button';
import { useTodoStore } from '../../store';
import { ITodo } from '../../types/Todo';

const NoteCreationForm = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('Criar nota...');
  const [error, setError] = useState('');
  const [requestInProgress, setRequestInProgress] = useState(false);
  const addTodo = useTodoStore((state) => state.addTodo);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content) {
      setError('Titulo e conteúdo são obrigatórios!');
      return;
    }

    const formValues = { title, content, is_favorite: isFavorite };

    if (!requestInProgress) {
      setRequestInProgress(true);
      try {
        const reset = await addTodo(formValues as ITodo);
        if (reset) {
          setTitle('');
          setContent('Criar nota...');
          setIsFavorite(false);
        }
      } catch (error) {
      } finally {
        setRequestInProgress(false);
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setStateFn: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setError('');
    setStateFn(event.target.value);
  };

  return (
    <>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.formContainer}>
        <form id="form" onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.heading}>
            <input
              value={title}
              placeholder="Titulo"
              onChange={(e) => handleChange(e, setTitle)}
              maxLength={80}
              required
            />
            <div className={styles.icons}>
              <Button title="Favoritar" onClick={toggleFavorite}>
                <FavoriteIcon isFavorite={isFavorite} />
              </Button>
              <Button title="Salvar" onClick={handleSubmit}>
                <SaveIcon />
              </Button>
            </div>
          </div>
          <textarea value={content} onChange={(e) => handleChange(e, setContent)}>
            Criar
          </textarea>
        </form>
      </div>
    </>
  );
};

export default NoteCreationForm;
