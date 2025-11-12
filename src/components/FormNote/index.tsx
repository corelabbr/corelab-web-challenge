import { ReactComponent as FavoriteIcon } from "../../assets/imgs/favorite.svg";
import { ReactComponent as ActiveFavoriteIcon } from "../../assets/imgs/activeFavorite.svg";
import COLORS from "../../constants/colors";
import { INote } from "../../types/Note";
import styles from "./FormNote.module.scss";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface IFormNoteProps {
  note: INote;
  setNote: React.Dispatch<React.SetStateAction<INote>>;
}

const FormNote = (props: IFormNoteProps) => {
  // Props to manipulate the note

  const { note, setNote } = props;

  // Handle input changes for title

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Toggle favorite status of the note

  const toggleFavorite = () => {
    setNote((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  // Handle changes in the Quill editor for note body

  const handleQuillChange = (value: string) => {
    setNote({ ...note, body: value });
  };

  return (
    <form className={styles.form} action="">
      <input
        type="text"
        placeholder="Título..."
        name="title"
        value={note.title}
        onChange={handleInputChange}
      />

      <div className={styles.formActions}>
        <div className={styles.colorPicker}>
          {COLORS.map((color) => (
            <button
              key={color}
              className={styles.colorCircle}
              style={{ background: color }}
              type="button"
              onClick={() => setNote({ ...note, color })}
            />
          ))}
        </div>

        <button
          className="btn-text"
          type="button"
          onClick={toggleFavorite}
          aria-label={note.isFavorite ? "Desfavoritar" : "Favoritar"}
        >
          {note.isFavorite ? <ActiveFavoriteIcon /> : <FavoriteIcon />}
        </button>
      </div>

      <ReactQuill
        theme="snow"
        value={note.body}
        onChange={handleQuillChange}
        placeholder="Descrição..."
        className={styles.quillEditor}
      />
    </form>
  );
};

export default FormNote;
