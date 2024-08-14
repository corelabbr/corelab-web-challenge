import { deleteNote } from "@/app/api/note/delete.note";
import { useNotes } from "@/app/context/notes-context";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

interface DeleteNoteDialogProps {
  buttonDeleteOpen: boolean;
  onButtonDeleteClick: () => void;
  id: string;
}

export function DeleteNoteDialog({
  buttonDeleteOpen,
  onButtonDeleteClick,
  id,
}: DeleteNoteDialogProps) {
  const [loading, setLoading] = useState(false);
  const { setNotes, notes } = useNotes();

  async function handleDeleteNote() {
    try {
      setLoading(true);
      await deleteNote(id).then(() => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
      });

      onButtonDeleteClick();
    } catch (error) {
      console.error("Erro ao excluir a nota:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={buttonDeleteOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#f0f4c3",
          color: "#333",
          borderRadius: "10px",
          padding: "20px",
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ fontWeight: "bold", fontSize: "1.5rem" }}
      >
        Deseja excluir esta nota?
      </DialogTitle>

      <DialogActions sx={{ justifyContent: "center", marginTop: "10px" }}>
        <Button
          onClick={onButtonDeleteClick}
          sx={{
            backgroundColor: "#bdbdbd",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#9e9e9e",
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleDeleteNote}
          sx={{
            backgroundColor: "#f44336",
            color: "#fff",
            marginLeft: "10px",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
          disabled={loading}
        >
          {loading ? "Excluindo..." : "Excluir"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
