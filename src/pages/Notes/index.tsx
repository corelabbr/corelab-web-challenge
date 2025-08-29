import { useContext, useEffect, useMemo, useState } from "react";
import { SearchContext } from "../../providers/SearchContext";
import { createNote, deleteNote, getNotes, updateNote } from "../../lib/api";
import { INote } from "../../types/Note";
import { Card } from "../../components";
import { IUpdateCard } from "../../types/UpdateCard";
import styles from "./Notes.module.scss";

const NotesPage = () => {
  
  const [createTitle, setCreateTitle] = useState("");
  const [createText, setCreateText] = useState("");
  const [notes, setNotes] = useState<INote[]>([]);

  const { searchTerm } = useContext(SearchContext);

  const fetchNotes = async () => {
    const notes = await getNotes();
    setNotes(notes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onCreate = (ev: any) => {
    ev.preventDefault();
    ev.stopPropagation();

    createNote({ title: createTitle, text: createText }).then(() => {
      setCreateTitle('');
      setCreateText('');

      fetchNotes();
    }).catch((error: any) => {
      console.error('createNote', error);
    });
  }

  const onUpdateCard = ({ id, title, text, color, favorite }: IUpdateCard) => {
    updateNote(id, { title, text, color, favorite }).then(() => {
      fetchNotes();
    }).catch((error: any) => {
      console.error('updateNote', error);
    });
  }

  const onClickDelete = (note: INote) => {
    deleteNote(note.id).then((res) => {
      fetchNotes();
    }).catch((error: any) => {
      console.error('deleteNote', error);
    });
  }

  const filteredFavNotes = useMemo(() => {
    const filterFav = notes.filter((note) => note.favorite);
    if (searchTerm.length) {
      return filterFav.filter((item) => {
        const title = item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        const text = item.text.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        return title || text;
      });
    } else {
      return filterFav;
    }
  }, [searchTerm, notes]);

  const filteredNotFavNotes = useMemo(() => {
    const filterNotFav = notes.filter((note) => !note.favorite);
    if (searchTerm.length) {
      return filterNotFav.filter((item) => {
        const title = item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        const text = item.text.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
        return title || text;
      });
    } else {
      return filterNotFav;
    }
  }, [searchTerm, notes]);

  return (
    <main className={styles.NotePage}>

      <section className={styles.CreateNote}>
        <div className={styles.CreateNoteTitle}>
          <input onChange={(e) => setCreateTitle(e.target.value)} placeholder="Título" value={createTitle} />
          {createTitle.length && createText.length ? (
              <svg onClick={(e) => onCreate(e)} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 10.086L2.164 7L1 8.164L5.25 12.414L13 4.664L11.836 3.5L5.25 10.086Z" fill="#51646E"/>
              </svg>
            ) : ( null )
          }
        </div>
        <div className={styles.CreateNoteContent}>
          <textarea onChange={(e) => setCreateText(e.target.value)} placeholder="Criar nota..." value={createText}></textarea>
        </div>
      </section>

      {filteredFavNotes.length ? (
          <section className={styles.Division}>
            <h1>Favoritas</h1>
            <div className={styles.NotesContainer}>
              {filteredFavNotes.map((note) => {
                return (
                  <Card key={note.id} id={note.id} title={note.title} text={note.text} favorite={note.favorite} color={note.color} onClickDelete={(e) => onClickDelete(note)} onUpdateCard={(update) => onUpdateCard(update)} />
                )
              })}
            </div>
          </section>
        ) : ( null )
      }
      {filteredNotFavNotes.length ? (
          <section className={styles.Division}>
            <h1>Outras</h1>
            <div className={styles.NotesContainer}>
              {filteredNotFavNotes.map((note) => {
                return (
                  <Card key={note.id} id={note.id} title={note.title} text={note.text} favorite={note.favorite} color={note.color} onClickDelete={(e) => onClickDelete(note)} onUpdateCard={(update) => onUpdateCard(update)} />
                )
              })}
            </div>
          </section>
        ) : ( null )
      }

      {(!filteredFavNotes.length && !filteredNotFavNotes.length) ? (
          <h1 className={styles.titleOfNone}>Nenhuma nota</h1>
        ) : ( null )
      }
    </main>
  );
};

export default NotesPage;
