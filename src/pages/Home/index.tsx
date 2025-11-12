/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrop";
import CreateNote from "../../components/CreateNote";
import EditNote from "../../components/EditNote";
import Navbar from "../../components/Navbar";
import Note from "../../components/Note";
import { useAuth } from "../../providers/AuthProvider";
import { INote } from "../../types/Note";
import styles from "./Home.module.scss";
import { deleteNote, updateColor, updateFavorite } from "../../api/notes";
import { useFeedback } from "../../providers/FeedbackProvider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // States to manage notes and modals

  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const { showLoading, showToast } = useFeedback();

  const [notes, setNotes] = useState<INote[]>([]);

  const [search, setSearch] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string[]>([]);

  const searchLower = search.trim().toLowerCase();

  const [open, setOpen] = useState<boolean>(false);

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<INote | null>(null);
  const [noteToRemove, setNoteToRemove] = useState<INote | null>(null);

  const favoriteNotes = notes && notes.filter((note) => note.isFavorite);
  const otherNotes = notes && notes.filter((note) => !note.isFavorite);
  const filteredFavoriteNotes =
    favoriteNotes &&
    favoriteNotes.filter(
      (note) =>
        (note.title.toLowerCase().includes(searchLower) ||
          note.body.toLowerCase().includes(searchLower)) &&
        (colorFilter.length === 0 || colorFilter.includes(note.color))
    );

  const filteredOtherNotes =
    otherNotes &&
    otherNotes.filter(
      (note) =>
        (note.title.toLowerCase().includes(searchLower) ||
          note.body.toLowerCase().includes(searchLower)) &&
        (colorFilter.length === 0 || colorFilter.includes(note.color))
    );

  // Handle for edit note

  const handleEdit = (note: INote) => {
    setNoteToEdit(note);
    setEditOpen(true);
  };

  // Handle for change to favorite status of note

  const handleToggleFavorite = async (note: INote) => {
    try {
      showLoading(true);
      const newIsFavorite = !note.isFavorite;
      await updateFavorite(note.id, newIsFavorite);
      setNotes((prev) =>
        prev.map((n) => (n === note ? { ...n, isFavorite: newIsFavorite } : n))
      );
      showToast({
        type: "success",
        title: "Note",
        message: newIsFavorite
          ? "Nota adicionada aos favoritos!"
          : "Nota removida dos favoritos!",
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      showToast({
        type: "error",
        title: "Erro",
        message: errorMessage,
      });
    } finally {
      showLoading(false);
    }
  };

  // Handle for change to color of note

  const handleChangeColor = async (note: INote, color: string) => {
    try {
      showLoading(true);
      await updateColor(note.id, color);
      setNotes((prev) => prev.map((n) => (n === note ? { ...n, color } : n)));
      showToast({
        type: "success",
        title: "Note",
        message: "Cor alterada com sucesso!",
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      showToast({
        type: "error",
        title: "Erro",
        message: errorMessage,
      });
    } finally {
      showLoading(false);
    }
  };

  // Handle for remove the note

  const handleRemoveNote = (note: INote) => {
    setNoteToRemove(note);
  };

  // Handle for confirm remove the note

  const confirmRemoveNote = async () => {
    try {
      showLoading(true);
      if (noteToRemove) {
        await deleteNote(noteToRemove.id);
        setNotes((prev) => prev.filter((n) => n !== noteToRemove));
        showToast({
          type: "success",
          title: "Note",
          message: "Nota deletada com sucesso!",
        });
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;

      showToast({
        type: "error",
        title: "Erro",
        message: errorMessage,
      });
    } finally {
      setNoteToRemove(null);
      showLoading(false);
    }
  };

  // Handle for cancel remove the note

  const cancelRemoveNote = () => {
    setNoteToRemove(null);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("login");
    }
    if (user) setNotes(user.listNotes);
  }, [user, isAuthenticated]);

  return (
    <div className={styles.home}>
      <Navbar
        search={search}
        setSearch={setSearch}
        colorFilter={colorFilter}
        setColorFilter={setColorFilter}
      />

      {/* Box to create note */}

      <CreateNote open={open} setOpen={setOpen} setNotes={setNotes} />

      <p
        className={styles.textSection}
        style={{
          marginLeft: "150px",
        }}
      >
        Favoritas
      </p>

      <div className={styles.cardsContainer}>
        {filteredFavoriteNotes.length === 0 && (
          <span style={{ color: "#888" }}>Nenhuma nota favoritada.</span>
        )}
        {filteredFavoriteNotes.map((note, index) => (
          <Note
            key={index}
            note={note}
            onEdit={() => handleEdit(note)}
            onToggleFavorite={() => handleToggleFavorite(note)}
            onChangeColor={(color) => handleChangeColor(note, color)}
            onRemove={() => handleRemoveNote(note)}
          />
        ))}
      </div>

      <p
        style={{
          marginLeft: "150px",
        }}
        className={styles.textSection}
      >
        Outros
      </p>

      <div className={styles.cardsContainer}>
        {filteredOtherNotes.length === 0 && (
          <span style={{ color: "#888" }}>Nenhuma outra nota.</span>
        )}
        {filteredOtherNotes.map((note, index) => (
          <Note
            key={index}
            note={note}
            onEdit={() => handleEdit(note)}
            onToggleFavorite={() => handleToggleFavorite(note)}
            onChangeColor={(color) => handleChangeColor(note, color)}
            onRemove={() => handleRemoveNote(note)}
          />
        ))}
      </div>

      {noteToEdit && (
        <EditNote
          open={editOpen}
          noteToEdit={noteToEdit}
          setNotes={setNotes}
          onClose={() => setEditOpen(false)}
        />
      )}

      {noteToRemove && (
        <Backdrop>
          <div className={styles.confirmDialog}>
            <p>Tem certeza que deseja remover esta nota?</p>
            <div className={styles.buttons}>
              <button className="btn-error" onClick={confirmRemoveNote}>
                Remover
              </button>
              <button className="btn-secondary" onClick={cancelRemoveNote}>
                Cancelar
              </button>
            </div>
          </div>
        </Backdrop>
      )}
    </div>
  );
};

export default Home;
