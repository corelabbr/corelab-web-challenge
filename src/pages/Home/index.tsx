import { useEffect, useState } from "react";
import Logo from "../../assets/icons/logo.png";
import NoteCard from "../../components/NoteCard";
import { Note } from "../../types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const initNote: Note = {
  _id: "",
  title: "",
  text: "",
  isFavorite: false,
  color: "#fff",
  createdAt: "",
};

function Home() {
  const [newNote, setNewNote] = useState<Note>(initNote);
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { favoriteNotes, otherNotes } = separateNotes();

  useEffect(() => {
    async function loadNotes() {
      try {
        const { data } = await axios.get<Note[]>(`${API_URL}/notes`);
        setNotes(data);
      } catch {
        alert("Erro ao tentar obter dados.");
      }
    }
    loadNotes();
  }, []);

  async function handleAddNote() {
    if (newNote.title.trim().length < 3) {
      return alert("O título de uma nota deve ter pelo menos 3 caracteres.");
    }

    if (newNote.text.trim().length < 3) {
      return alert("O texto de uma nota deve ter pelo menos 3 caracteres.");
    }

    try {
      const { data: note } = await axios.post<Note>(
        `${API_URL}/notes`,
        newNote
      );
      setNotes((prev) => [...prev, note]);
      setNewNote(initNote);
    } catch {
      alert("Erro ao tentar adicionar nota.");
    }
  }

  async function handleSearch() {
    try {
      const { data } = await axios.get<Note[]>(
        `${API_URL}/notes/${searchQuery.trim()}`
      );
      setNotes(data);
    } catch {
      alert("Erro ao tentar obter dados.");
    }
  }

  async function onDeleteClick(id: string) {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch {
      alert("Erro ao tentar remover nota.");
    }
  }

  async function onFavoriteClick(note: Note) {
    try {
      const updatedNote = await updateNote(note._id, {
        isFavorite: !note.isFavorite,
      });

      updateNoteState(updatedNote);
    } catch {
      alert("Erro ao tentar atualizar nota.");
    }
  }

  async function onConfirmEditClick(note: Note) {
    try {
      const updatedNote = await updateNote(note._id, {
        title: note.title,
        text: note.text,
      });

      updateNoteState(updatedNote);
    } catch {
      alert("Erro ao tentar atualizar nota.");
    }
  }

  async function onColorClick(id: string, color: string) {
    try {
      const updatedNote = await updateNote(id, {
        color,
      });

      updateNoteState(updatedNote);
    } catch {
      alert("Erro ao tentar mudar a cor da nota.");
    }
  }

  async function updateNote(
    id: string,
    data:
      | { isFavorite: boolean }
      | { title: string; text: string }
      | { color: string }
  ) {
    const { data: updatedNote } = await axios.patch<Note>(
      `${API_URL}/notes/${id}`,
      data
    );
    return updatedNote;
  }

  function updateNoteState(note: Note) {
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === note._id) {
        setNotes((prev) => {
          const updatedNotes = [...prev];
          updatedNotes[i] = note;
          return updatedNotes;
        });
        break;
      }
    }
  }

  function separateNotes() {
    const separatedNotes = notes.reduce<{
      favoriteNotes: Note[];
      otherNotes: Note[];
    }>(
      (acc, note) => {
        if (note.isFavorite) {
          acc.favoriteNotes.push(note);
        } else {
          acc.otherNotes.push(note);
        }
        return acc;
      },
      { favoriteNotes: [], otherNotes: [] }
    );
    return separatedNotes;
  }

  return (
    <>
      <header className="header">
        <div className="header_section">
          <img src={Logo} width={36} height={36} />

          <span>CoreNotes</span>

          <div className="search-bar">
            <input
              className="search-bar__input"
              placeholder="Pesquisar notas"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button className="button" onClick={handleSearch}>
              <svg
                className="search-bar__icon"
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Pesquisar</title>
                <path
                  d="M11.8914 13.8464L7.47727 9.12144C7.12695 9.42144 6.72407 9.65894 6.26864 9.83393C5.81321 10.0089 5.32859 10.0964 4.81477 10.0964C3.54191 10.0964 2.46477 9.62469 1.58334 8.68119C0.701445 7.73719 0.260498 6.58394 0.260498 5.22144C0.260498 3.85894 0.701445 2.70569 1.58334 1.76169C2.46477 0.818186 3.54191 0.346436 4.81477 0.346436C6.08764 0.346436 7.16501 0.818186 8.04691 1.76169C8.92834 2.70569 9.36905 3.85894 9.36905 5.22144C9.36905 5.77144 9.28731 6.29019 9.12382 6.77769C8.96033 7.26519 8.73846 7.69644 8.4582 8.07144L12.8723 12.7964L11.8914 13.8464ZM4.81477 8.59644C5.6906 8.59644 6.43516 8.26844 7.04847 7.61244C7.66131 6.95594 7.96773 6.15894 7.96773 5.22144C7.96773 4.28394 7.66131 3.48694 7.04847 2.83044C6.43516 2.17444 5.6906 1.84644 4.81477 1.84644C3.93895 1.84644 3.19439 2.17444 2.58108 2.83044C1.96823 3.48694 1.66181 4.28394 1.66181 5.22144C1.66181 6.15894 1.96823 6.95594 2.58108 7.61244C3.19439 8.26844 3.93895 8.59644 4.81477 8.59644Z"
                  fill="#9E9E9E"
                />
              </svg>
            </button>
          </div>
        </div>

        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4156 2.2405L12.092 0.91687L6.8444 6.16445L1.59682 0.91687L0.273193 2.2405L5.52077 7.48807L0.273193 12.7357L1.59682 14.0593L6.8444 8.8117L12.092 14.0593L13.4156 12.7357L8.16803 7.48807L13.4156 2.2405Z"
            fill="#51646E"
          />
        </svg>
      </header>

      <section className="main-section">
        <div className="new-note">
          <div className="new-note__header">
            <input
              className="card-input"
              placeholder="Título"
              value={newNote.title}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, title: e.target.value }))
              }
            />

            <button
              className="button"
              onClick={() =>
                setNewNote((prev) => ({
                  ...prev,
                  isFavorite: !prev.isFavorite,
                }))
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Favorito</title>
                <path
                  d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
                  fill={newNote.isFavorite ? "#FFA000" : "#fff"}
                />
                <path
                  d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
                  fill="#455A64"
                />
              </svg>
            </button>
          </div>
          <hr />
          <div className="new-note__body">
            <input
              className="card-input"
              placeholder="Criar nota..."
              value={newNote.text}
              onChange={(e) =>
                setNewNote((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          </div>

          <div className="new-note__footer">
            <button
              className="button"
              style={{ textAlign: "end" }}
              onClick={handleAddNote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="#455A64"
              >
                <title>Adicionar</title>
                <path d="M8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s8-3.582,8-8S12.418,0,8,0z M12,9H9v3H7V9H4V7h3V4h2v3h3V9z"></path>
              </svg>
            </button>
          </div>
        </div>

        <section className="cards-section">
          {favoriteNotes.length > 0 && (
            <div className="cards-section_row">
              <span className="cards-section__title">Favoritas</span>

              <div className="cards-section__container">
                {favoriteNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDeleteClick={onDeleteClick}
                    onConfirmEditClick={onConfirmEditClick}
                    onFavoriteClick={onFavoriteClick}
                    onColorClick={(color) => onColorClick(note._id, color)}
                  />
                ))}
              </div>
            </div>
          )}

          {otherNotes.length > 0 && (
            <div className="cards-section_row">
              <span className="cards-section__title">Outras</span>

              <div className="cards-section__container">
                {otherNotes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onDeleteClick={onDeleteClick}
                    onConfirmEditClick={onConfirmEditClick}
                    onFavoriteClick={onFavoriteClick}
                    onColorClick={(color) => onColorClick(note._id, color)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default Home;
