import { ReactNode, useEffect, useState } from 'react';
import styles from './Card.module.scss';
import { MdOutlineEdit } from 'react-icons/md';
import solidColor from '../../assets/colors.png';
import close from '../../assets/close.png';
import star from '../../assets/star.png';
import filledStar from '../../assets/FullFilledStar.png';
import { ITask } from '../../types/Task';
import { putTask } from '../../lib/api';
import ColorModal from './ColorModal';
import { toast } from 'react-toastify';
import { FaRegSave } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface ICard {
  data: ITask;
  isFavorite?: boolean;
  children: ReactNode;
  onFavoriteToggle: (id: string, newFavorite: boolean) => void;
  onDelete: (id: string) => void;
  setIsEditing: (isEditing: boolean) => void;
  onUpdate: (updatedTask: ITask) => void;
  isColorMenuOpen: string | null;
  setIsColorMenuOpen: (id: string | null) => void;
}

const Card = (props: ICard) => {
  const [favoriteState, setFavoriteState] = useState<boolean | undefined>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(props.data.title);
  const [taskContent, setTaskContent] = useState(props.data.taskContent);

  const handleOverlayEditing = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    try {
        
      const updatedTask = await putTask(props.data._id, {
        title,
        taskContent,
        isFavorite: favoriteState,
      });

      toast.success('Task atualizada com sucesso!');
      props.onUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Erro ao atualizar a task:', error);
      toast.error('Erro ao atualizar a task!');
    }
  };

  const handleDelete = () => {
    props.onDelete(props.data._id);
  };

  const toggleColorMenu = () => {
    if (props.isColorMenuOpen === props.data._id) {
      props.setIsColorMenuOpen(null);
    } else {
      props.setIsColorMenuOpen(props.data._id);
    }
  };

  const handleEditing = () => {
    setIsEditing(!isEditing);
    props.setIsEditing(isEditing);
  };

  const handleColorCard = (color: string) => {
    setBackgroundColor(color);

    props.setIsColorMenuOpen(null);

    localStorage.setItem(`card-color-${props.data._id}`, color);
  };

  const actualStar = favoriteState ? filledStar : star;

  const handleFavorite = async () => {
    const newFavoriteState = !favoriteState;
    const { title, taskContent } = props.data;
    try {
      await putTask(props.data._id, {
        title,
        taskContent,
        isFavorite: newFavoriteState,
      });
      setFavoriteState(newFavoriteState);
      props.onFavoriteToggle(props.data._id, newFavoriteState);
    } catch (error) {
      console.error('Failed to update favorite status:', error);
    }
  };

  useEffect(() => {
    setFavoriteState(props.isFavorite);
    const savedColor = localStorage.getItem(`card-color-${props.data._id}`);
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
  }, [props.isFavorite, props.data._id]);

  return (
    <>
      <div className={`${styles.overlay} ${isEditing ? styles.active : ''}`} onClick={handleOverlayEditing}></div>
      <div className={`${styles.Card} ${isEditing ? styles.editing : ''}`} style={{ backgroundColor: backgroundColor }}>
        <header className={styles.cardHeader}>
          {props.isColorMenuOpen === props.data._id && (
            <ColorModal cardColor={backgroundColor} onColorPick={handleColorCard} />
          )}

          <div
            className={styles.titleContainer}
            style={{ borderBottom: `1px solid ${backgroundColor === '#FFFFFF' ? '#D9D9D9' : '#FFFFFF'}` }}
          >
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.titleInput}
                maxLength={25}
              />
            ) : (
              <>
                <p className={styles.title}>{props.data.title}</p>
                <img src={actualStar} alt="Descrição da Imagem" className={styles.star} onClick={handleFavorite} />
              </>
            )}
          </div>
          <div className={styles.separator} />
          <div className={styles.content}>
            {isEditing ? (
              <textarea
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                className={styles.contentTextArea}
                maxLength={100}
              />
            ) : (
              props.children
            )}
          </div>
        </header>

        <footer className={styles.cardFooter}>
          <div className={styles.cardFooterMenu}>
            <div>
              <MdOutlineEdit className={styles.cardEdit} onClick={handleEditing} />
            </div>
            <div>
              <img
                src={solidColor}
                alt="Descrição da Imagem"
                className={styles.cardColorPicker}
                onClick={toggleColorMenu}
              />
            </div>
          </div>

          <div className={styles.footerCloseMenu}>
            {isEditing && (
              <IoMdArrowRoundBack className={styles.Button} onClick={handleOverlayEditing}></IoMdArrowRoundBack>
            )}

            {isEditing ? (
              <FaRegSave onClick={handleEdit} className={styles.Button} />
            ) : (
              <img src={close} alt="Descrição da Imagem" className={styles.closeCard} onClick={handleDelete} />
            )}
          </div>
        </footer>
      </div>
    </>
  );
};

export default Card;
