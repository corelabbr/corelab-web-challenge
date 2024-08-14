import React, { useState, useEffect } from "react";
import Note from "../Note";
import ModalColors from "../Modals/ModalColor";
import "./styles.scss";
import {
  getNotes,
  updateNoteTitle,
  updateNoteContent,
  updateNoteColor,
  toggleNoteFavorite,
  deleteNote,
} from "../../api/routes";

import { IoMdColorFilter } from "react-icons/io";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi";

interface NoteData {
  id: number;
  title: string;
  content: string;
  color: string;
  favorite: boolean;
}

interface NotesProps {
  newNote: NoteData;
  searchTerm: string;
}

const Notes: React.FC<NotesProps> = ({ newNote, searchTerm }) => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [filteredNotesByColorOthers, setFilteredNotesByColorOthers] = useState<
    NoteData[]
  >([]);
  const [filteredNotesByColorFav, setFilteredNotesByColorFav] = useState<
    NoteData[]
  >([]);
  const [favoritesCollapsed, setFavoritesCollapsed] = useState(false);
  const [othersCollapsed, setOthersCollapsed] = useState(false);
  const [showFilterColorsFav, setShowFilterColorsFav] = useState(false);
  const [showFilterColorsOthers, setShowFilterColorsOthers] = useState(false);
  const [filterColorsOthersOn, setFilterColorsOthersOn] = useState(false);
  const [filterColorsFavOn, setFilterColorsFavOn] = useState(false);
  const [isSearchTermOn, setIsSearchTermOn] = useState(false);
  const [filterColorsOthers, setFilterColorsOthers] = useState("");
  const [filterColorsFav, setFilterColorsFav] = useState("");

  const handleColorChangeFav = (color: string) => {
    const notasFiltradas = notes.filter((note) => note.color === color);
    setFilteredNotesByColorFav(notasFiltradas);
    setFilterColorsFavOn(true);
    setFilterColorsFav(color);
  };

  const handleColorChangeOthers = (color: string) => {
    const notasFiltradas = notes.filter((note) => note.color === color);
    setFilteredNotesByColorOthers(notasFiltradas);
    setFilterColorsOthersOn(true);
    setFilterColorsOthers(color);
  };

  const filteredNotes = notes.filter((note) => {
    const titleMatch =
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) || false;

    const contentMatch =
      note.content?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    return titleMatch || contentMatch;
  });

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsSearchTermOn(true);
      setFilterColorsFavOn(false);
      setFilterColorsOthersOn(false);
    } else {
      setIsSearchTermOn(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (newNote.id) {
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }
  }, [newNote]);

  const handleUpdateNoteTitle = async (id: number, updatedTitle: string) => {
    try {
      await updateNoteTitle(id, updatedTitle);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, title: updatedTitle } : note,
        ),
      );
    } catch (error) {
      console.error("Error updating note title:", error);
    }
  };

  const handleUpdateNoteContent = async (
    id: number,
    updatedContent: string,
  ) => {
    try {
      const response = await updateNoteContent(id, updatedContent);

      if (response.status === 200) {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === id ? { ...note, content: updatedContent } : note,
          ),
        );
      } else {
        throw new Error("Error updating note content");
      }
    } catch (error) {
      console.error("Error updating note content:", error);
    }
  };

  const handleUpdateNoteColor = async (id: number, updatedColor: string) => {
    try {
      await updateNoteColor(id, updatedColor);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, color: updatedColor } : note,
        ),
      );
    } catch (error) {
      console.error("Error updating note color:", error);
    }
  };

  const handleToggleNoteFavorite = async (id: number, newFavorite: boolean) => {
    try {
      await toggleNoteFavorite(id, newFavorite);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, favorite: newFavorite } : note,
        ),
      );
    } catch (error) {
      console.error("Error toggling note favorite:", error);
    }
  };

  const notify = () => {
    toast("Nota removida!");
  };

  const handleDeleteNote = async (id: number) => {
    try {
      await deleteNote(id);
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      notify();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleShowColorsOthers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowFilterColorsOthers((prev) => !prev);
  };
  const handleShowColorsFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowFilterColorsFav((prev) => !prev);
  };

  return (
    <div className="notes_container">
      <ToastContainer />
      <section className="filter_section">
        <div className="others_header">
          <h4>Favoritas</h4>
          <button
            className="collapse_button"
            onClick={() => setFavoritesCollapsed(!favoritesCollapsed)}
          >
            {favoritesCollapsed ? <PiEyeClosedLight /> : <PiEyeLight />}
          </button>

          <button
            className="collapse_button_other"
            style={{
              background: filterColorsFavOn ? filterColorsFav : "transparent",
            }}
            onClick={() => setShowFilterColorsFav(true)}
          >
            <IoMdColorFilter />
          </button>

          {showFilterColorsFav && (
            <ModalColors
              setShowColors={setShowFilterColorsFav}
              setColor={handleColorChangeFav}
              showColors={showFilterColorsFav}
              handleShowColors={handleShowColorsFav}
              setFilterColorsOtherOn={setFilterColorsFavOn}
              colorFilter={true}
            />
          )}
        </div>
        {!favoritesCollapsed &&
          (filterColorsFavOn && filteredNotesByColorFav.length === 0 ? (
            <div>Não há notas nesta cor.</div>
          ) : isSearchTermOn === true || filterColorsFavOn === false ? (
            filteredNotes
              .filter((note) => note.favorite)
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  onUpdateTitle={handleUpdateNoteTitle}
                  onUpdateContent={handleUpdateNoteContent}
                  onUpdateColor={handleUpdateNoteColor}
                  onToggleFavorite={handleToggleNoteFavorite}
                  onDelete={handleDeleteNote}
                />
              ))
          ) : (
            filteredNotesByColorFav
              .filter((note) => note.favorite)
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  onUpdateTitle={handleUpdateNoteTitle}
                  onUpdateContent={handleUpdateNoteContent}
                  onUpdateColor={handleUpdateNoteColor}
                  onToggleFavorite={handleToggleNoteFavorite}
                  onDelete={handleDeleteNote}
                />
              ))
          ))}
      </section>

      <section className="filter_section">
        <div className="others_header">
          <h4 className="other">Outras</h4>

          <button
            className="collapse_button_other"
            onClick={() => setOthersCollapsed(!othersCollapsed)}
          >
            {othersCollapsed ? <PiEyeClosedLight /> : <PiEyeLight />}
          </button>

          <button
            className="collapse_button_other"
            style={{
              background: filterColorsOthersOn
                ? filterColorsOthers
                : "transparent",
            }}
            onClick={() => setShowFilterColorsOthers(true)}
          >
            <IoMdColorFilter />
          </button>

          {showFilterColorsOthers && (
            <ModalColors
              setShowColors={setShowFilterColorsOthers}
              setColor={handleColorChangeOthers}
              showColors={showFilterColorsOthers}
              handleShowColors={handleShowColorsOthers}
              setFilterColorsOtherOn={setFilterColorsOthersOn}
              colorFilter={true}
            />
          )}
        </div>
        {!othersCollapsed &&
          (filterColorsOthersOn && filteredNotesByColorOthers.length === 0 ? (
            <div>Não há notas nesta cor.</div>
          ) : isSearchTermOn === true || filterColorsOthersOn === false ? (
            filteredNotes
              .filter((note) => !note.favorite)
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  onUpdateTitle={handleUpdateNoteTitle}
                  onUpdateContent={handleUpdateNoteContent}
                  onUpdateColor={handleUpdateNoteColor}
                  onToggleFavorite={handleToggleNoteFavorite}
                  onDelete={handleDeleteNote}
                />
              ))
          ) : (
            filteredNotesByColorOthers
              .filter((note) => !note.favorite)
              .map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  onUpdateTitle={handleUpdateNoteTitle}
                  onUpdateContent={handleUpdateNoteContent}
                  onUpdateColor={handleUpdateNoteColor}
                  onToggleFavorite={handleToggleNoteFavorite}
                  onDelete={handleDeleteNote}
                />
              ))
          ))}
      </section>
    </div>
  );
};
export default Notes;
