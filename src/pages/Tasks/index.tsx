import { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../../lib/api';
import { Card, Header } from '../../components';
import styles from './Tasks.module.scss';
import Container from '../../components/Container';
import { ITask } from '../../types/Task';
import Register from '../../components/Register';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/ConfirmModal';

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<ITask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState<string | null>(null);

  const handleDeleteClick = (task: ITask) => {
    setTaskToDelete(task);
    setIsModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEdit = (updatedTask: ITask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  useEffect(() => {
    search ? fetchTasks({ title: search }) : fetchTasks();
  }, []);

  const handleFavoriteToggle = (id: string, newFavorite: boolean) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === id ? { ...task, isFavorite: newFavorite } : task)));
  };

  const fetchTasks = async (filter?: { title: string }) => {
    try {
      const payload = await getTasks(filter);
      setTasks(payload);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      toast.error('Error ao buscar as tarefas!');
    }
  };

  const handleDeleteConfirm = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete._id);
        const updatedTasks = tasks.filter((item) => item._id !== taskToDelete._id);
        setTasks(updatedTasks);
        toast.info('Tarefa excluída com sucesso!');
      } catch (e) {
        console.error(e);
        toast.error('Erro ao excluir a tarefa!');
      } finally {
        setIsModalOpen(false);
        setTaskToDelete(null);
      }
    }
  };

  return (
    <div className={styles.Tasks}>
      <Header fetchSearchedTasks={fetchTasks} value={search} onChange={handleSearch} />
      <main className={styles.main}>
        <Register fetchTasks={fetchTasks} />

        <Container title="Favoritas">
          {tasks
            ?.filter((item) => item.isFavorite)
            .map((item) => (
              <Card
                data={item}
                isFavorite={item.isFavorite}
                key={item._id}
                onFavoriteToggle={handleFavoriteToggle}
                onDelete={() => handleDeleteClick(item)}
                onUpdate={handleEdit}
                setIsEditing={setIsEditing}
                isColorMenuOpen={isColorMenuOpen}
                setIsColorMenuOpen={setIsColorMenuOpen}
              >
                <p className={styles.text}>{item.taskContent}</p>
              </Card>
            ))}
        </Container>

        <Container title="Outras">
          {tasks
            ?.filter((item) => !item.isFavorite)
            .map((item) => (
              <Card
                data={item}
                isFavorite={item.isFavorite}
                key={item._id}
                onFavoriteToggle={handleFavoriteToggle}
                onDelete={() => handleDeleteClick(item)}
                onUpdate={handleEdit}
                setIsEditing={setIsEditing}
                isColorMenuOpen={isColorMenuOpen}
                setIsColorMenuOpen={setIsColorMenuOpen}
              >
                <p className={styles.text}>{item.taskContent}</p>
              </Card>
            ))}
        </Container>
      </main>
      <ConfirmModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        message={`Tem certeza que deseja excluir a tarefa "${taskToDelete?.title}"?`}
      />
    </div>
  );
};

export default TasksPage;
