import React from "react";
import Backdrop from "../Backdrop";
import FormNote from "../FormNote";
import styles from "./NoteDialog.module.scss";
import { INote } from "../../types/Note";

interface NoteDialogProps {
  open: boolean;
  title: string;
  note: INote;
  setNote: React.Dispatch<React.SetStateAction<INote>>;
  onSave: () => void;
  onClose: () => void;
}

const NoteDialog = ({
  open,
  title,
  note,
  setNote,
  onSave,
  onClose,
}: NoteDialogProps) => {
  if (!open) return null;
  return (
    <Backdrop>
      <div
        data-testid="note-dialog-container"
        className={styles.dialog}
        style={{ background: note.color }}
      >
        <h3>{title}</h3>
        <FormNote note={note} setNote={setNote} />
        <div className={styles.buttons}>
          <button className="btn-success" type="button" onClick={onSave}>
            Salvar
          </button>
          <button className="btn-error" type="button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

export default NoteDialog;
