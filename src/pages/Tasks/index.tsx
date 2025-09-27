import { useEffect, useState, useRef } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../../lib/api';
import { Card, Search } from '../../components';
import CreateNote from '../../components/CreateNote';
import styles from './Tasks.module.scss';
import { ITask } from '../../types/Task';

import ColorPicker from '../../components/ColorPicker';
import ConfirmationLightbox from '../../components/ConfirmationLightbox';

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState('');
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [showHeaderColorPicker, setShowHeaderColorPicker] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState<{
    title: string;
    description: string;
    color: string;
  }>({ title: '', description: '', color: '' });
  const [colorPickerId, setColorPickerId] = useState<number | null>(null);
  const [colorPickerPos, setColorPickerPos] = useState<{ top: number; left: number } | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const colorButtonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const payload = await getTasks();
        setTasks(payload);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData: Partial<ITask>) => {
    try {
      await createTask(taskData);
      const payload = await getTasks();
      setTasks(payload);
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleFavorite = async (task: ITask) => {
    console.log('Chamou handleFavorite para task:', task);
    try {
      const updatedTask = await updateTask(task.id, { isFavorite: !task.isFavorite});
      console.log('Resposta do backend ao favoritar:', updatedTask);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  const handleDelete = async () => {
    if (deletingTaskId === null) return;
    try {
      await deleteTask(deletingTaskId);
      setTasks(tasks.filter((t) => t.id !== deletingTaskId));
      setDeletingTaskId(null); // Fecha o lightbox
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleEditSave = async (task: ITask, title: string, description: string, color: string) => {
    try {
      const updatedTask = await updateTask(task.id, {
        title,
        description,
        color: color || task.color,
      });
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      setEditingId(null);
      setColorPickerId(null);
      setColorPickerPos(null);
      setEditingDraft({ title: '', description: '', color: '' }); // Limpa o draft
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleColorPicker = (task: ITask) => {
    if (colorPickerId === task.id) {
      setColorPickerId(null);
      setColorPickerPos(null);
      return;
    }
    setEditingId(null);
    setEditingDraft({ title: '', description: '', color: '' });
    const btn = colorButtonRefs.current[task.id];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const parentRect = btn.offsetParent ? (btn.offsetParent as HTMLElement).getBoundingClientRect() : { left: 0, top: 0, bottom: 0 };
      setColorPickerPos({
        top: rect.bottom - parentRect.top,
        left: rect.left - parentRect.left,
      });
      setColorPickerId(task.id);
    }
  };

  const handleColorSelect = async (task: ITask, color: string) => {
    setEditingDraft((draft) => ({ ...draft, color }));
    // Se a cor for vazia ou "remover", envie o valor padrão "#ffffff"
    const colorToSend = !color || color === 'white' ? '#ffffff' : color;
    if (editingId === task.id) {
      // Se estiver editando, só muda draft, salva ao salvar edição
    } else {
      try {
        const updatedTask = await updateTask(task.id, { color: colorToSend });
        setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
      } catch (error) {
        console.error('Failed to update color:', error);
      }
    }
    setColorPickerId(null);
    setColorPickerPos(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesText =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesColor = filterColor ? task.color === filterColor : true;
    return matchesText && matchesColor;
  });

  const favoriteTasks = filteredTasks.filter((task) => task.isFavorite);
  const otherTasks = filteredTasks.filter((task) => !task.isFavorite);

  const renderColorPicker = (task: ITask) => {
    if (colorPickerId !== task.id || !colorPickerPos) return null;
    return (
      <ColorPicker
        onSelectColor={(color) => handleColorSelect(task, color)}
        selected={editingId === task.id ? editingDraft.color || task.color : task.color}
        top={colorPickerPos.top}
        left={colorPickerPos.left}
        fixed={false}
      />
    );
  };

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.appLogo}>
          <img src="/assets/images/logo.png" alt="CoreNotes Logo" className={styles.logoIcon} />
          <span>CoreNotes</span>
        </div>

        <div
          className={styles.headerSearchContainer}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <img src="/assets/icons/search.svg" alt="Search" className={styles.searchIcon} />
          <Search
            placeholder="Pesquisar notas"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
            style={
              filterColor
                ? {
                    backgroundColor:
                      require('../../constants/colors').COLORS.find((c: { name: string; hex: string }) => c.name === filterColor)?.hex || '#fff',
                    transition: 'background 0.2s',
                  }
                : undefined
            }
          />
          <button
            style={{
              background: 'none',
              border: 'none',
              marginLeft: 8,
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Filtrar por cor"
            onClick={() => {
              setShowHeaderColorPicker((v) => !v);
              setEditingId(null);
              setEditingDraft({ title: '', description: '', color: '' });
              setColorPickerId(null);
              setColorPickerPos(null);
            }}
          >
            <img
              src="/assets/icons/paint.svg"
              alt="Filtrar por cor"
              style={{
                width: 20,
                height: 20,
                opacity: filterColor ? 1 : 0.6,
                filter:
                  filterColor && filterColor !== 'white'
                    ? `drop-shadow(0 0 4px ${
                        {
                          blue: '#ADD8E6',
                          yellow: 'khaki',
                          green: '#90EE90',
                          orange: '#FFB07A',
                          pink: '#FFB6C1',
                          purple: 'plum',
                          cyan: '#AFEEEE',
                          lime: '#ADFF2F',
                          coral: 'coral',
                          gray: '#D3D3D3',
                          brown: '#DEB887',
                        }[filterColor] || '#fff'
                      })`
                    : undefined,
              }}
            />
          </button>
          {showHeaderColorPicker && (
            <div style={{ position: 'absolute', top: 40, right: 0, zIndex: 10000 }}>
              <ColorPicker
                onSelectColor={(color) => {
                  if (color === 'white') {
                    setFilterColor(null);
                    setSearch('');
                  } else {
                    setFilterColor(color);
                  }
                  setShowHeaderColorPicker(false);
                }}
                selected={filterColor || undefined}
                fixed={true}
              />
              <button
                style={{
                  marginTop: 4,
                  background: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  padding: '2px 8px',
                  cursor: 'pointer',
                  fontSize: 12,
                }}
                onClick={() => {
                  setFilterColor(null);
                  setShowHeaderColorPicker(false);
                  setSearch('');
                }}
              >
                Limpar filtro
              </button>
            </div>
          )}
        </div>

        <div className={styles.headerActions}>
          <button className={styles.closeButton} aria-label="Fechar aplicação">
            <img src="/assets/icons/delete.svg" alt="Close" className={styles.iconClose} />
          </button>
        </div>
      </header>

      <div className={styles.appContainer}>
        <section className={styles.createNoteSection}>
          <CreateNote onCreate={handleCreateTask} />
        </section>

        {favoriteTasks.length > 0 && (
          <section className={styles.notesSection}>
            <h2 className={styles.sectionTitle}>Favoritas</h2>
            <div className={styles.notesGrid}>
              {favoriteTasks.map((task) => (
                <div key={task.id} style={{ position: 'relative' }}>
                  <Card
                    title={editingId === task.id ? editingDraft.title : task.title}
                    color={editingId === task.id ? editingDraft.color || task.color : task.color}
                    isFavorite={task.isFavorite}
                    onFavorite={() => handleFavorite(task)}
                    onEdit={(title, description) =>
                      handleEditSave(task, title, description, editingDraft.color || task.color)
                    }
                    onDelete={() => setDeletingTaskId(task.id)}
                    onColor={() => {
                      setShowHeaderColorPicker(false);
                      handleColorPicker(task);
                    }}
                    showColorPicker={colorPickerId === task.id}
                    onColorSelect={(color) => handleColorSelect(task, color)}
                    colorButtonRef={(el) => (colorButtonRefs.current[task.id] = el)}
                    editing={editingId === task.id}
                    onEditStart={() => {
                      setShowHeaderColorPicker(false);
                      setEditingId(task.id);
                      setEditingDraft({
                        title: task.title,
                        description: task.description,
                        color: task.color,
                      });
                      setColorPickerId(null);
                      setColorPickerPos(null);
                    }}
                    onEditCancel={() => {
                      setEditingId(null);
                      setEditingDraft({ title: '', description: '', color: '' });
                    }}
                  >
                    {editingId === task.id ? editingDraft.description : task.description}
                  </Card>
                  {renderColorPicker(task)}
                </div>
              ))}
            </div>
          </section>
        )}

        {otherTasks.length > 0 && (
          <section className={styles.notesSection}>
            <h2 className={styles.sectionTitle}>Outras</h2>
            <div className={styles.notesGrid}>
              {otherTasks.map((task) => (
                <div key={task.id} style={{ position: 'relative' }}>
                  <Card
                    title={editingId === task.id ? editingDraft.title : task.title}
                    color={editingId === task.id ? editingDraft.color || task.color : task.color}
                    isFavorite={task.isFavorite}
                    onFavorite={() => handleFavorite(task)}
                    onEdit={(title, description) =>
                      handleEditSave(task, title, description, editingDraft.color || task.color)
                    }
                    onDelete={() => setDeletingTaskId(task.id)}
                    onColor={() => {
                      setShowHeaderColorPicker(false);
                      handleColorPicker(task);
                    }}
                    showColorPicker={colorPickerId === task.id}
                    onColorSelect={(color) => handleColorSelect(task, color)}
                    colorButtonRef={(el) => (colorButtonRefs.current[task.id] = el)}
                    editing={editingId === task.id}
                    onEditStart={() => {
                      setShowHeaderColorPicker(false);
                      setEditingId(task.id);
                      setEditingDraft({
                        title: task.title,
                        description: task.description,
                        color: task.color,
                      });
                      setColorPickerId(null);
                      setColorPickerPos(null);
                    }}
                    onEditCancel={() => {
                      setEditingId(null);
                      setEditingDraft({ title: '', description: '', color: '' });
                    }}
                  >
                    {editingId === task.id ? editingDraft.description : task.description}
                  </Card>
                  {renderColorPicker(task)}
                </div>
              ))}
            </div>
          </section>
        )}

        {deletingTaskId !== null && (
          <ConfirmationLightbox
            message="Você tem certeza que deseja excluir esta nota?"
            onConfirm={handleDelete}
            onCancel={() => setDeletingTaskId(null)}
          />
        )}
      </div>
    </>
  );
};

export default TasksPage;
