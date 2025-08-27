import { useEffect, useState, useRef, useMemo } from "react";
import { INote } from "../../types/Note";
import { Button, Card, Search, ColorPicker } from "../../components";
import { EditIcon, PaintIcon, DeleteIcon, SaveIcon, StarIcon } from "../../components/Icons";
import styles from "./Notes.module.scss";
import { getNotes, createNote, updateNote, deleteNote } from "../../lib/api";
import { Color, DEFAULT_COLORS } from "../../constants/colors";
import { IconContext } from "react-icons";
import Swal from 'sweetalert2';
import logo from '../../assets/images/logo.png';
import { useDebounce } from "../../hooks/useDebounce";

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

const NotesPage = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [search, setSearch] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("blue");
  const [selectedFilterColor, setSelectedFilterColor] = useState<string>("");
  const [newNoteTitle, setNewNoteTitle] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");
  const [editingNotes, setEditingNotes] = useState<{ [key: string]: { title: string; body: string } }>({});
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
  const [colorPickerOpen, setColorPickerOpen] = useState<{ [key: string]: boolean }>({});
  
  const newNoteBodyRef = useRef<HTMLTextAreaElement>(null);
  const noteBodyRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  const debouncedSearch = useDebounce(search, 500);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [notes]);

  const filteredNotes = useMemo(() => {
    let filtered = sortedNotes;

    if (debouncedSearch) {
      const searchTerm = debouncedSearch.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm) || 
        note.body.toLowerCase().includes(searchTerm)
      );
    }

    if (selectedFilterColor) {
      filtered = filtered.filter(note => note.colorId === selectedFilterColor);
    }

    return filtered;
  }, [sortedNotes, debouncedSearch, selectedFilterColor]);

  const favoriteNotes = useMemo(() => {
    return filteredNotes.filter(note => note.isFavorite);
  }, [filteredNotes]);

  const otherNotes = useMemo(() => {
    return filteredNotes.filter(note => !note.isFavorite);
  }, [filteredNotes]);

  useEffect(() => {
    const fetchNotes = async () => {
      const payload = await getNotes();
      setNotes(payload);
    };

    fetchNotes();
  }, []);

  const handleColorChange = async (note: INote, color: Color) => {
    setSelectedColor(color.id);
    try {
      await updateNote({
        _id: note._id,
        title: note.title,
        body: note.body,
        colorId: color.id,
        isFavorite: note.isFavorite,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        updateTimestamp: false
      });

      const payload = await getNotes();
      setNotes(payload);
      setColorPickerOpen(prev => ({ ...prev, [note._id as string]: false }));
    } catch (error) {
      console.error('Erro ao atualizar cor:', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNoteTitle && !newNoteBody) return;

    const now = new Date();
    try {
      await createNote({
        title: newNoteTitle,
        body: newNoteBody,
        colorId: 'white',
        isFavorite: false,
        createdAt: now,
        updatedAt: now
      });

      setNewNoteTitle("");
      setNewNoteBody("");

      const payload = await getNotes();
      setNotes(payload);
      
      Toast.fire({
        icon: 'success',
        title: 'Nota criada com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao criar nota: ', error);
      Toast.fire({
        icon: 'error',
        title: 'Erro ao criar nota'
      });
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Esta ação não poderá ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FFA000',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      });

      if (result.isConfirmed) {
        await deleteNote(noteId);
        const payload = await getNotes();
        setNotes(payload);
        
        Toast.fire({
          icon: 'success',
          title: 'Nota excluída com sucesso!'
        });
      }
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      Toast.fire({
        icon: 'error',
        title: 'Erro ao excluir nota'
      });
    }
  };

  const toggleEditMode = async (noteId: string) => {
    if (editMode[noteId]) {
      const editingNote = editingNotes[noteId];
      if (editingNote) {
        const note = notes.find(n => n._id === noteId);
        if (note) {
          try {
            await handleUpdateNote(note, {
              title: editingNote.title,
              body: editingNote.body
            });
            
            Toast.fire({
              icon: 'success',
              title: 'Nota atualizada com sucesso!'
            });
          } catch (error) {
            Toast.fire({
              icon: 'error',
              title: 'Erro ao atualizar nota'
            });
            return;
          }
        }
      }
    } else {
      const note = notes.find(n => n._id === noteId);
      if (note) {
        setEditingNotes(prev => ({
          ...prev,
          [noteId]: { title: note.title, body: note.body }
        }));
      }
    }
    
    setEditMode(prev => ({ ...prev, [noteId]: !prev[noteId] }));
  };

  const handleNoteChange = (noteId: string, field: 'title' | 'body', value: string) => {
    setEditingNotes(prev => ({
      ...prev,
      [noteId]: {
        ...prev[noteId] || { title: notes.find(n => n._id === noteId)?.title || '', body: notes.find(n => n._id === noteId)?.body || '' },
        [field]: value
      }
    }));
  };

  const handleUpdateNote = async (note: INote, updates: Partial<INote>) => {
    try {
      await updateNote({
        _id: note._id,
        title: updates.title || note.title,
        body: updates.body || note.body,
        colorId: note.colorId,
        isFavorite: note.isFavorite,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        updateTimestamp: true
      });

      const payload = await getNotes();
      setNotes(payload);
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
    }
  };

  const handleToggleFavorite = async (note: INote) => {
    try {
      await updateNote({
        _id: note._id,
        title: note.title,
        body: note.body,
        colorId: note.colorId,
        isFavorite: !note.isFavorite,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        updateTimestamp: false
      });

      const payload = await getNotes();
      setNotes(payload);
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <div className={styles.Notes}>
        <div className={styles.headerContainer}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <span className={styles.logoText}>CoreNotes</span>
          </div>
          <div className={styles.searchContainer}>
            <Search 
              className={styles.searchInput} 
              placeholder="Pesquisar notas" 
              value={search} 
              onChange={(value: string) => setSearch(value)} 
            />
            <div className={styles.colorFilter}>
              <ColorPicker
                colors={[{ id: "", hex: "#FFFFFF", name: "Todas" }, ...DEFAULT_COLORS]}
                selectedColor={selectedFilterColor}
                type="filter"
                onSelect={(color: Color) => setSelectedFilterColor(color.id)}
              />
            </div>
          </div>
        </div>
        <main className={styles.main}>
          <div className={styles.addNoteContainer}>
            <Card colorHex='#FFFFFF' variant="add">
              <input 
                type="text" 
                className={styles.noteTitleAdd}
                placeholder="Título" 
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
              />
              <hr />
              <div className={`${styles.noteBody} ${styles.noteBodyAdd}`}>
                <textarea 
                  ref={newNoteBodyRef}
                  className={styles.noteTextarea}
                  placeholder="Criar nota..." 
                  value={newNoteBody}
                  onChange={(e) => setNewNoteBody(e.target.value)}
                />
              </div>
              <div className={styles.noteFooter}>
                  <div className={styles.rightButtons}>
                    <button 
                      onClick={() => handleAddNote()}
                      title="Criar nota"
                    >
                      <SaveIcon />
                    </button>
                </div>
              </div>
            </Card>
          </div>
          <span className={styles.sectionTitle}>Favoritas</span>
          <div className={styles.notesContainer}>
            {favoriteNotes.length === 0 ? (
              <div className={styles.alert}>
                Não há notas a serem exibidas nesta categoria
              </div>
            ) : (
              favoriteNotes.map((note) => (
                <Card key={note._id} colorHex={DEFAULT_COLORS.find(color => color.id === note.colorId)?.hex || ''}>
                  <div className={styles.noteTitleContainer}>
                    <input 
                      type="text" 
                      className={styles.noteTitle}
                      value={editingNotes[note._id as string]?.title ?? note.title} 
                      onChange={(e) => handleNoteChange(note._id as string, 'title', e.target.value)}
                      readOnly={!editMode[note._id as string]}
                    />
                    <button 
                      className={styles.starButton}
                      onClick={() => handleToggleFavorite(note)}
                      title={note.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <StarIcon isFavorite={note.isFavorite} />
                    </button>
                  </div>
                  <hr />
                  <div className={styles.noteBody}>
                    <textarea 
                      ref={el => note._id ? (noteBodyRefs.current[note._id] = el) : null}
                      className={styles.noteTextarea}
                      value={editingNotes[note._id as string]?.body ?? note.body} 
                      onChange={(e) => handleNoteChange(note._id as string, 'body', e.target.value)}
                      readOnly={!editMode[note._id as string]}
                    />
                  </div>
                  <div className={styles.noteFooter}>
                    <div className={styles.leftButtons}>
                      <button 
                        onClick={() => toggleEditMode(note._id as string)}
                        className={editMode[note._id as string] ? styles.active : ''}
                        title={editMode[note._id as string] ? 'Salvar edição' : 'Editar'}
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => setColorPickerOpen(prev => ({ ...prev, [note._id as string]: !prev[note._id as string] }))}
                        className={colorPickerOpen[note._id as string] ? styles.active : ''}
                      >
                        <PaintIcon />
                      </button>
                    </div>
                    <div className={styles.rightButtons}>
                      <button onClick={() => handleDeleteNote(note._id as string)}>
                        <DeleteIcon />
                      </button>
                    </div>
                    {colorPickerOpen[note._id as string] && (
                      <ColorPicker
                        colors={DEFAULT_COLORS}
                        selectedColor={note.colorId}
                        type="note"
                        onSelect={(color: Color) => handleColorChange(note, color)}
                      />
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
          <span className={styles.sectionTitle}>Outras</span>
          <div className={styles.notesContainer}>
            {otherNotes.length === 0 ? (
              <div className={styles.alert}>
                Não há notas a serem exibidas nesta categoria
              </div>
            ) : (
              otherNotes.map((note) => (
                <Card key={note._id} colorHex={DEFAULT_COLORS.find(color => color.id === note.colorId)?.hex || ''}>
                  <div className={styles.noteTitleContainer}>
                    <input 
                      type="text" 
                      className={styles.noteTitle}
                      value={editingNotes[note._id as string]?.title ?? note.title} 
                      onChange={(e) => handleNoteChange(note._id as string, 'title', e.target.value)}
                      readOnly={!editMode[note._id as string]}
                    />
                    <button 
                      className={styles.starButton}
                      onClick={() => handleToggleFavorite(note)}
                      title={note.isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                    >
                      <StarIcon isFavorite={note.isFavorite} />
                    </button>
                  </div>
                  <hr />
                  <div className={styles.noteBody}>
                    <textarea 
                      ref={el => note._id ? (noteBodyRefs.current[note._id] = el) : null}
                      className={styles.noteTextarea}
                      value={editingNotes[note._id as string]?.body ?? note.body} 
                      onChange={(e) => handleNoteChange(note._id as string, 'body', e.target.value)}
                      readOnly={!editMode[note._id as string]}
                    />
                  </div>
                  <div className={styles.noteFooter}>
                    <div className={styles.leftButtons}>
                      <button 
                        onClick={() => toggleEditMode(note._id as string)}
                        className={editMode[note._id as string] ? styles.active : ''}
                        title={editMode[note._id as string] ? 'Salvar edição' : 'Editar'}
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => setColorPickerOpen(prev => ({ ...prev, [note._id as string]: !prev[note._id as string] }))}
                        className={colorPickerOpen[note._id as string] ? styles.active : ''}
                      >
                        <PaintIcon />
                      </button>
                    </div>
                    <div className={styles.rightButtons}>
                      <button onClick={() => handleDeleteNote(note._id as string)}>
                        <DeleteIcon />
                      </button>
                    </div>
                    {colorPickerOpen[note._id as string] && (
                      <ColorPicker
                        colors={DEFAULT_COLORS}
                        selectedColor={note.colorId}
                        onSelect={(color: Color) => handleColorChange(note, color)}
                      />
                    )}
                  </div>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </IconContext.Provider>
  );
};

export default NotesPage;