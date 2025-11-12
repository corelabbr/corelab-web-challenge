import { useState } from "react";
import { ReactComponent as FavoriteIcon } from "../../assets/imgs/favorite.svg";
import { INote } from "../../types/Note";
import Divider from "../Divider";
import NoteDialog from "../NoteDialog";
import styles from "./CreateNote.module.scss";
import { useAuth } from "../../providers/AuthProvider";
import { createNote } from "../../api/notes";
import { useFeedback } from "../../providers/FeedbackProvider";

interface CreateNoteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
}

const CreateNote = (props: CreateNoteProps) => {
  // Getting the user of provider and functions to feedback

  const { user } = useAuth();

  const { showLoading, showToast } = useFeedback();

  // Destructure props and state of new note

  const { open, setOpen, setNotes } = props;

  const [newNote, setNewNote] = useState<INote>({
    id: "0.1",
    title: "",
    body: "",
    color: "#FFF",
    isFavorite: false,
  });

  // Handle adding a new note

  const addNote = async () => {
    if (!newNote.title) {
      showToast({
        type: "error",
        title: "Erro",
        message: "Preencha ao menos o titulo!",
      });
      return;
    }

    const noteRequest = {
      title: newNote.title,
      body: newNote.body,
      color: newNote.color,
      isFavorite: newNote.isFavorite,
      userId: user.id,
    };

    showLoading(true);
    try {
      const response = await createNote(noteRequest);
      showToast({
        type: "success",
        title: "Nota",
        message: "Nota criada com sucesso!",
      });
      setNotes((prev) => [...prev, { ...response.data }]);
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Erro",
        message: error?.response?.data?.message || "Erro ao criar nota.",
      });
    } finally {
      setOpen(false);
      showLoading(false);
      setNewNote({
        id: "0.1",
        title: "",
        body: "",
        color: "#FFF",
        isFavorite: false,
      });
    }
  };

  // Dom of the component

  return (
    <>
      <div onClick={() => setOpen(true)} className={styles.cardCreate}>
        <div className={styles.cardCreateHeader}>
          <h4>Título</h4>

          <FavoriteIcon />
        </div>

        <Divider />

        <div className={styles.cardCreateBody}>
          <p>Criar nota...</p>
        </div>
      </div>
      {open ? (
        <NoteDialog
          open={open}
          title="Criar Nota"
          note={newNote}
          setNote={setNewNote}
          onSave={addNote}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default CreateNote;
