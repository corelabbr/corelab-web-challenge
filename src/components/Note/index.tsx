import styles from "./Note.module.scss";
import { ReactComponent as PencilIcon } from "../../assets/imgs/pencil.svg";
import { ReactComponent as ColorBucketIcon } from "../../assets/imgs/colorBucket.svg";
import { ReactComponent as RemoveIcon } from "../../assets/imgs/remove.svg";
import { ReactComponent as FavoriteIcon } from "../../assets/imgs/favorite.svg";
import { ReactComponent as ActiveFavoriteIcon } from "../../assets/imgs/activeFavorite.svg";
import Divider from "../Divider";
import { useRef, useState } from "react";
import COLORS from "../../constants/colors";
import { INote } from "../../types/Note";

interface INoteProps {
  note: INote;
  onEdit: () => void;
  onToggleFavorite: () => void;
  onChangeColor: (color: string) => void;
  onRemove: () => void;
}

const Note = (props: INoteProps) => {
  // Destructure props and state of the note

  const { note, onEdit, onToggleFavorite, onChangeColor, onRemove } = props;

  const [showColors, setShowColors] = useState(false);
  const colorBtnRef = useRef<HTMLButtonElement>(null);

  // Dom of the component

  return (
    <div
      className={
        note.isFavorite ? `${styles.note} ${styles.favoriteNote}` : styles.note
      }
      style={{ background: note.color }}
    >
      <div className={styles.noteHeader}>
        <h4>{note.title}</h4>

        <button
          type="button"
          className={styles.actionBtn}
          onClick={onToggleFavorite}
          aria-label={note.isFavorite ? "Desfavoritar" : "Favoritar"}
        >
          {note.isFavorite ? <ActiveFavoriteIcon /> : <FavoriteIcon />}
        </button>
      </div>

      <Divider color={note.color !== "#FFF" ? "#FFF" : undefined} />

      <div className={styles.noteBody}>
        <div
          style={{ width: "100%" }}
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </div>

      <div className={styles.noteActions}>
        <div className={styles.actionsGroup}>
          <button
            aria-label="Editar nota"
            type="button"
            className={styles.actionBtn}
            onClick={onEdit}
          >
            <PencilIcon />
          </button>

          <button
            type="button"
            aria-label="Selecionar cor"
            className={styles.actionBtn}
            ref={colorBtnRef}
            onClick={() => setShowColors((prev) => !prev)}
          >
            <ColorBucketIcon />
          </button>
          {showColors && (
            <div className={styles.colorPicker}>
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={styles.colorCircle}
                  style={{ background: color }}
                  type="button"
                  onClick={() => {
                    onChangeColor(color); // chama a função recebida por prop
                    setShowColors(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.actionBtn}
          onClick={onRemove}
          aria-label="Remover nota"
        >
          <RemoveIcon />
        </button>
      </div>
    </div>
  );
};

export default Note;
