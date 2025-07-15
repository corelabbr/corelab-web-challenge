import { FaRegStar, FaStar } from "react-icons/fa";
import styles from "./NoteForm.module.scss";
import { useEffect, useState, useRef } from "react";

interface INoteFormProps {
  onNoteAdd: (noteData: {
    title: string;
    content: string;
    isFavorite: boolean;
  }) => void;
}

function NoteForm({ onNoteAdd }: INoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreateNote = () => {
    if (title.trim() === "" && content.trim() === "") {
      return;
    }

    onNoteAdd({
      title: title.trim(),
      content: content.trim(),
      isFavorite: isFavorite,
    });

    setTitle("");
    setContent("");
    setIsFavorite(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleCreateNote();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [title, content, isFavorite, onNoteAdd]);

  return (
    <form className={styles.NoteForm} ref={formRef}>
      <div className={styles.NoteForm__titleArea}>
        <input
          type="text"
          placeholder="Título"
          className={styles.titleInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="button" onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? (
            <FaStar size={22} style={{ color: "#FFA000" }} />
          ) : (
            <FaRegStar size={22} />
          )}
        </button>
      </div>
      <div className={styles.NoteForm__content}>
        {" "}
        <textarea
          placeholder="Criar nota..."
          className={styles.contentInput}
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </form>
  );
}

export default NoteForm;
