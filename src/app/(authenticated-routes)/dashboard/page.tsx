'use client';

import { useEffect, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { IFindNoteByIdResponse } from '../../../api/endpoints/notes/find-note-by-id.request';
import starNote from '../../../api/endpoints/notes/star-note.request';
import { useModal } from '../../../presentation/hooks/useModal';
import Note from '../../../presentation/components/Note';
import browseNotes from '../../../api/endpoints/notes/browse-notes.request';
import Modal from '../../../presentation/components/Modal';
import LoadingScreen from '../../../presentation/components/Loading';
import Image from 'next/image';
import searchNotes from '../../../api/endpoints/notes/search-notes.request';
import deleteNote from '../../../api/endpoints/notes/delete-note.request';
import editNote from '../../../api/endpoints/notes/edit-note.request';
import changeNoteColor from '../../../api/endpoints/notes/change-note-color.request';
import NoteCreator from '../../../presentation/components/NoteCreator';

export default function DashboardPage() {
  const { modal, setModal, openCloseModal } = useModal();

  const [notes, setNotes] = useState<IFindNoteByIdResponse[]>([]);
  const [areNotesLoading, setNotesLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const starredNotes = useMemo(() => {
    return notes.filter((note) => note.starred);
  }, [notes]);

  const otherNotes = useMemo(() => {
    return notes.filter((note) => !note.starred);
  }, [notes]);

  function setError(message: string) {
    setErrorMessage(message);
  }

  const handleSearchNotes = async (content: string) => {
    const token = sessionStorage.getItem('session');
    try {
      const data = await searchNotes(content, token);
      if ('statusCode' in data) {
        setError(data.message);
      } else {
        setNotes(data);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleNoteStar = async (noteId: string) => {
    const token = sessionStorage.getItem('session');
    try {
      const data = await starNote(
        {
          note_id: noteId,
        },
        token,
      );

      if ('statusCode' in data) {
        setError(data.message);
        setModal({ message: data.message, type: 'error' });
      } else {
        const notes = await browseNotes(token);

        if ('statusCode' in notes) {
          setError(notes.message);
          setModal({ message: notes.message, type: 'error' });
        } else {
          setNotes(notes);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChangeColor = async (
    noteId: string,
    color: 'red' | 'yellow' | 'blue' | 'green',
  ) => {
    const token = sessionStorage.getItem('session');
    try {
      const data = await changeNoteColor(
        {
          note_id: noteId,
          note_color: color,
        },
        token,
      );
      if ('statusCode' in data) {
        setError(data.message);
        setModal({ message: data.message, type: 'error' });
      } else {
        const notes = await browseNotes(token);
        if ('statusCode' in notes) {
          setError(notes.message);
          setModal({ message: errorMessage, type: 'error' });
        } else {
          setNotes(notes);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEditNote = async (
    noteId: string,
    noteData: { note_title: string; note_text: string },
  ) => {
    const token = sessionStorage.getItem('session');

    try {
      const data = await editNote(noteId, noteData, token);
      if ('statusCode' in data) {
        setError(data.message);
        if (errorMessage.includes('Validation failed'))
          setError('Favor, inserir dados válidos para editar a nota.');
        setModal({ message: errorMessage, type: 'error' });
      } else {
        const notes = await browseNotes(token);

        if ('statusCode' in notes) {
          setError(notes.message);
          setModal({ message: notes.message, type: 'error' });
        } else {
          setNotes(notes);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleNoteDelete = async (noteId: string) => {
    const token = sessionStorage.getItem('session');
    try {
      const data = await deleteNote(noteId, token);

      if ('statusCode' in data) {
        setError(data.message);
        setModal({ message: data.message, type: 'error' });
      } else {
        const notes = await browseNotes(token);

        if ('statusCode' in notes) {
          setError(notes.message);
          setModal({ message: notes.message, type: 'error' });
        } else {
          setNotes(notes);
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      const token = sessionStorage.getItem('session');
      const data = await browseNotes(token);

      if ('statusCode' in data) {
        setErrorMessage(data.message);
      } else {
        setNotes(data);

        setNotesLoading(false);
      }
    })();
  }, [areNotesLoading]);

  if (areNotesLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className={s.dashboard}>
      <section className={s.top}>
        <h1 className={s.title}>Core Notes</h1>
        <span className={s.search_bar}>
          <Image
            src="/search-icon.png"
            alt="Search"
            width={16}
            height={16}
            className={s.search_icon}
          />
          <input
            type="text"
            placeholder="Search notes..."
            className={s.search_input}
            name="search"
            onChange={(e) => handleSearchNotes(e.target.value)}
          />
        </span>
      </section>
      <section className={`${s.create_note}`}>
        <NoteCreator onNoteCreated={() => handleSearchNotes('')} />
      </section>

      {!areNotesLoading && starredNotes && starredNotes.length > 0 ? (
        <section className={`${s.favorites} ${s.section}`}>
          <h4 className={s.section_title}>Favorites</h4>
          <div className={s.cards}>
            {starredNotes.map((note) => (
              <Note
                key={note.id_note}
                note_title={note.note_title}
                id_note={note.id_note}
                note_color={note.note_color}
                note_text={note.note_text}
                starred={note.starred}
                starNote={() => handleNoteStar(note.id_note)}
                changeColor={(data) =>
                  handleChangeColor(note.id_note, data.note_color)
                }
                updateNote={(data) =>
                  handleEditNote(note.id_note, {
                    note_title: data.note_title,
                    note_text: data.note_text,
                  })
                }
                deleteNote={() => handleNoteDelete(note.id_note)}
              />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
      {!areNotesLoading && otherNotes && otherNotes.length > 0 ? (
        <section className={`${s.other} ${s.section}`}>
          <h4 className={s.section_title}>Other</h4>
          <div className={s.cards}>
            {otherNotes.map((note) => (
              <Note
                key={note.id_note}
                note_title={note.note_title}
                id_note={note.id_note}
                note_color={note.note_color}
                note_text={note.note_text}
                starred={note.starred}
                starNote={() => handleNoteStar(note.id_note)}
                changeColor={(data) =>
                  handleChangeColor(note.id_note, data.note_color)
                }
                updateNote={(data) =>
                  handleEditNote(note.id_note, {
                    note_title: data.note_title,
                    note_text: data.note_text,
                  })
                }
                deleteNote={() => handleNoteDelete(note.id_note)}
              />
            ))}
          </div>
        </section>
      ) : (
        <></>
      )}
      {modal?.message !== '' && (
        <Modal
          modal={modal}
          openCloseModal={openCloseModal}
          key={modal.message}
        />
      )}
    </main>
  );
}