import { TaskCard } from '../../components';
import CreateTaskInput from '../../components/CreateTaskInput';
import styles from './Home.module.scss';

const HomePage = () => {
  const task = {
    id: '1',
    title: 'Título da nota',
    body: 'Conteúdo da nota',
    favorited: false,
    color: '#FFFFFF',
  };

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <CreateTaskInput />
        <div className={styles.NotesContainer}>
          <h3>Favoritas</h3>
          <TaskCard task={task} />
          <TaskCard task={task} />
        </div>
        <div className={styles.NotesContainer}>
          <h3>Outras</h3>
          <TaskCard task={task} />
          <TaskCard task={task} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
