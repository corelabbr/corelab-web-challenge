import React, { ReactNode, useState, useRef } from 'react';
import styles from './Card.module.scss';

interface ICard {
  title: string;
  children: ReactNode;
  color?: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
  onEdit?: (_title: string, _content: string) => void;
  onDelete?: () => void;
  onColor?: () => void;
  showColorPicker?: boolean;
  onColorSelect?: (_color: string) => void;
  colorButtonRef?: (_el: HTMLButtonElement | null) => void;
  editing?: boolean;
  onEditStart?: () => void;
  onEditCancel?: () => void;
}

const Card = (props: ICard) => {
  const [editTitle, setEditTitle] = useState(props.title);
  const [editContent, setEditContent] = useState(
    typeof props.children === 'string' ? props.children : '',
  );
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const editing = !!props.editing;

  // Sync draft state with props when editing starts or card changes
  React.useEffect(() => {
    if (editing) {
      setEditTitle(props.title);
      setEditContent(typeof props.children === 'string' ? props.children : '');
      setTimeout(() => {
        if (titleRef.current) titleRef.current.focus();
      }, 0);
    }
  }, [editing, props.title, props.children]);

  const colorClass = props.color ? styles[props.color] : '';
  const cardClasses = [
    styles.noteCard,
    colorClass,
    props.isFavorite? styles.favorite : '',
    editing ? styles.editingMode : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleEditClick = () => {
    if (editing) {
      handleSave();
    } else if (props.onEditStart) {
      props.onEditStart();
    }
  };

  const handleSave = () => {
    if (props.onEdit) {
      props.onEdit(editTitle, editContent);
    }
    if (props.onEditCancel) {
      props.onEditCancel();
    }
  };

  const handleCancel = () => {
    setEditTitle(props.title);
    setEditContent(typeof props.children === 'string' ? props.children : '');
    if (props.onEditCancel) {
      props.onEditCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return (
    <div className={cardClasses}>
      <div className={styles.noteHeader}>
        {editing ? (
          <input
            ref={titleRef}
            className={`${styles.noteTitle} ${styles.editing} ${styles.blink}`}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={100}
          />
        ) : (
          <h2 className={styles.noteTitle}>{props.title}</h2>
        )}
        <div className={styles.noteActions}>
          <button
            onClick={props.onFavorite}
            className={styles.favoriteStar}
            aria-label="Favorite"
            tabIndex={editing ? -1 : 0}
          >
            <img
              src={
                props.isFavorite? '/assets/icons/star-filled.svg' : '/assets/icons/star-empty.svg'
              }
              alt="Favorite"
            />
          </button>
        </div>
      </div>
      <div className={`${styles.noteContent} ${editing ? styles.blink : ''}`}>
        {editing ? (
          <textarea
            ref={contentRef}
            className={`${styles.noteContent} ${styles.editing}`}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={1000}
          />
        ) : (
          props.children
        )}
      </div>
      <div className={styles.noteFooter}>
        <div className={styles.noteFooterActions} style={{ width: '100%' }}>
          <button
            onClick={handleEditClick}
            className={`${styles.actionButton} ${editing ? styles.active : ''}`}
            aria-label="Edit"
          >
            <img src="/assets/icons/edit.svg" alt="Edit" />
          </button>
          <button
            onClick={props.onColor}
            className={`${styles.actionButton} ${props.showColorPicker ? styles.active : ''}`}
            aria-label="Alterar cor"
            ref={props.colorButtonRef}
          >
            <img src="/assets/icons/paint.svg" alt="Cor" />
          </button>
          {/* Espaço flexível para empurrar o delete para a direita */}
          <div style={{ flex: 1 }} />
          <button
            onClick={props.onDelete}
            className={`${styles.actionButton} ${styles.deleteButton}`}
            aria-label="Delete"
          >
            <img src="/assets/icons/delete.svg" alt="Delete" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
