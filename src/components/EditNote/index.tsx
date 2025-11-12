import { useState } from "react";
import { INote } from "../../types/Note";
import NoteDialog from "../NoteDialog";
import { useFeedback } from "../../providers/FeedbackProvider";
import { updateNote } from "../../api/notes";

const EditNote = ({
  open,
  noteToEdit,
  setNotes,
  onClose,
}: {
  open: boolean;
  noteToEdit: INote;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  onClose: () => void;
}) => {
  // State to edit note and feedback handlers

  const { showLoading, showToast } = useFeedback();

  const [note, setNote] = useState<INote>(noteToEdit);

  // Handler to save the edited note

  const handleSave = async () => {
    try {
      showLoading(true);
      if (!note.title) {
        showToast({
          type: "error",
          title: "Erro",
          message: "Preencha ao menos o titulo!",
        });
        return;
      }

      await updateNote(note.id, note);
      showToast({
        type: "success",
        title: "Nota",
        message: "Nota alterada com sucesso!",
      });
      setNotes((prev) => prev.map((n) => (n === noteToEdit ? note : n)));
    } catch (error: any) {
      showToast({
        type: "error",
        title: "Erro",
        message: error?.response?.data?.message || "Erro ao criar nota.",
      });
    } finally {
      showLoading(false);
      onClose();
    }
  };

  return (
    <NoteDialog
      open={open}
      title="Editar Nota"
      note={note}
      setNote={setNote}
      onSave={handleSave}
      onClose={onClose}
    />
  );
};

export default EditNote;
