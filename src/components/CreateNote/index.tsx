import React, { useState } from 'react';
import styles from './CreateNote.module.scss';
import { ITask } from '../../types/Task';

interface ICreateNoteProps {
  onCreate: (_task: Partial<ITask>) => void;
}

const CreateNote: React.FC<ICreateNoteProps> = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddClick = () => {
    if (title || description) {
      onCreate({ title, description, isFavorite});
      setTitle('');
      setDescription('');
      setIsFavorite(false);
    }
  };

  return (
    <div className={styles.createNoteCard} role="button" tabIndex={0}>
      <div className={styles.createNoteHeader}>
        <input
          type="text"
          className={styles.createNoteTitle}
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.createNoteActions}>
          <button
            className={`${styles.createNoteStar} ${isFavorite? styles.active : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
            aria-label="Marcar como favorita"
          >
            <img
              src={isFavorite? '/assets/icons/star-filled.svg' : '/assets/icons/star-empty.svg'}
              alt="Favorite"
              className={styles.iconStar}
            />
          </button>
        </div>
      </div>
      <div className={styles.createNoteSeparator}></div>
      <textarea
        className={styles.createNoteContent}
        placeholder="Criar nota..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className={styles.createNoteFooter}>
        <button
          className={styles.createNoteAddButton}
          onClick={handleAddClick}
          aria-label="Adicionar nota"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CreateNote;
