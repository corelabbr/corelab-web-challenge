import React, { useState } from "react";
import styles from "./Card.module.scss";
import { FaFillDrip, FaRegStar, FaSave, FaStar } from "react-icons/fa";
import { FiEdit2, FiX } from "react-icons/fi";
import ColorPalette from "../ColorPalette";
import { AppColors } from "../../constants/colors";

interface ICard {
  title: string;
  content: string;
  backgroundCard?: string;
  isFavorite?: boolean;
  onUpdate: (updatedData: {
    title?: string;
    content?: string;
    isFavorite?: boolean;
    color?: string;
  }) => void;
  onDelete: () => void;
}

const Card = ({
  title,
  content,
  backgroundCard,
  isFavorite,
  onUpdate,
  onDelete,
}: ICard) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const toggleFavorite = () => {
    onUpdate({ isFavorite: !isFavorite });
  };

  const togglePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
  };
  const handleColorSelect = (color: string) => {
    onUpdate({ color: color });
    setIsPaletteOpen(false);
  };

  const toggleEditMode = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    onUpdate({ title: editedTitle, content: editedContent });
    setIsEditing(false);
  };

  return (
    <div className={styles.Card} style={{ backgroundColor: backgroundCard }}>
      <div className={styles.Card__titleArea}>
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.editInput}
            autoFocus
            aria-label="Campo de edição do título"
          />
        ) : (
          <h2>{title}</h2>
        )}
        <button
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Desfavoritar nota" : "Favoritar nota"}
          title={isFavorite ? "Desfavoritar" : "Favoritar"}
        >
          {isFavorite ? (
            <FaStar
              size={22}
              style={{ color: AppColors.FAVORITE_STAR_COLOR }}
            />
          ) : (
            <FaRegStar size={22} />
          )}
        </button>
      </div>

      <div className={styles.Card__content}>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className={styles.editTextarea}
            aria-label="Campo de edição do conteúdo"
          />
        ) : (
          <div>
            <p>{content}</p>
          </div>
        )}
      </div>

      <div className={styles.Card__footer}>
        <div className={styles.Card__footerRight}>
          <button
            onClick={isEditing ? handleSaveChanges : toggleEditMode}
            aria-label={isEditing ? "Salvar edição" : "Editar nota"}
            title={isEditing ? "Salvar" : "Editar"}
          >
            {isEditing ? <FaSave size={22} /> : <FiEdit2 size={22} />}
          </button>
          <button
            onClick={togglePalette}
            aria-label="Abrir paleta de cores"
            title="Mudar cor"
          >
            <FaFillDrip size={22} />
          </button>
        </div>
        <button onClick={onDelete} aria-label="Deletar nota" title="Deletar">
          <FiX size={22} />
        </button>
      </div>

      {isPaletteOpen && (
        <div className={styles.paletteContainer}>
          <ColorPalette onColorSelect={handleColorSelect} />
        </div>
      )}
    </div>
  );
};

export default Card;
