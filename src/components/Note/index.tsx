import styles from './Note.module.scss';
import Button from '../Button';
import { ChooseColorIcon, EditIcon, FavoriteIcon, SaveIcon, XIcon } from '../Icons';
import ColorPallete from '../ColorPallete';
import { useEffect, useState } from 'react';
import { useTodoStore } from '../../store';
import { createPortal } from 'react-dom';
import ConfirmDeleteModal from '../ConfirmDeleteModal';

interface INote {
  title: string;
  content: string;
  color?: string;
  is_favorite: boolean;
  id: number;
}

const Note = ({ color, title, is_favorite, content, id }: INote) => {
  const [titleInput, setTitleInput] = useState(title);
  const [contentInput, setContentInput] = useState(content);
  const [error, setError] = useState('');
  const [showPallete, setShowPallete] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const favoriteTodo = useTodoStore((state) => state.favoriteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const toggleColorPallete = (e: MouseEvent) => {
    e.stopPropagation();
    setEditMode(true);
    setShowPallete((prev) => !prev);
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const toggleFavorite = async () => {
    favoriteTodo(id, { is_favorite: !is_favorite });
  };

  const saveChanges = async () => {
    if (titleInput === '' || contentInput === '') {
      setError('Titulo e conteúdo são obrigatórios!');
      return;
    }
    const todo = {
      title: titleInput,
      content: contentInput,
      color,
      is_favorite,
      id,
    };

    if (!requestInProgress) {
      setRequestInProgress(true);
      try {
        updateTodo(todo);
        setEditMode(false);
      } catch (error) {
      } finally {
        setRequestInProgress(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    stateToChange: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setError('');
    stateToChange(e.target.value);
  };

  useEffect(() => {
    const closeColorPallete = () => {
      setShowPallete(false);
    };

    document.body.addEventListener('click', closeColorPallete);

    return () => document.body.removeEventListener('click', closeColorPallete);
  }, []);

  return (
    <>
      {showModal &&
        createPortal(
          <ConfirmDeleteModal closeModal={() => setShowModal(false)} id={id} />,
          document.body
        )}

      <div className={styles.container}>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <div
          style={{
            backgroundColor: color ?? 'white',
            boxShadow: is_favorite ? '02px 2px 3px rgba(0, 0, 0, 0.25)' : 'none',
          }}
          className={styles.Card}>
          <div
            style={{
              borderBottom: color ? '1px solid #FFFFFF' : '1px solid #D9D9D9',
            }}
            className={styles.heading}
            title={titleInput}>
            <input
              title={title}
              readOnly={!editMode}
              value={titleInput}
              onChange={(e) => handleChange(e, setTitleInput)}
              type="text"
            />

            <div>
              {editMode && (
                <Button title="Salvar" onClick={saveChanges}>
                  <SaveIcon />
                </Button>
              )}

              <Button title="Favoritar" onClick={toggleFavorite}>
                <FavoriteIcon isFavorite={is_favorite} />
              </Button>
            </div>
          </div>

          <div className={styles.content}>
            <textarea
              readOnly={!editMode}
              value={contentInput}
              onChange={(e) => handleChange(e, setContentInput)}
              style={{
                scrollbarColor: color
                  ? 'white rgba(0, 0, 0, 0.15)'
                  : 'rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.15)',
              }}></textarea>
            <footer className={styles.Footer}>
              <Button title="Editar" onClick={toggleEditMode}>
                <EditIcon />
              </Button>

              <Button title="Paleta de cores" onClick={toggleColorPallete}>
                <ChooseColorIcon />
              </Button>
              {showPallete && <ColorPallete id={id} />}
              <div className={styles.delete}>
                <Button title="Excluir" onClick={() => setShowModal(true)}>
                  <XIcon />
                </Button>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
