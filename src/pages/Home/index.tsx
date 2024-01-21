import { TaskCard } from '../../components';
import CreateTaskInput from '../../components/CreateTaskInput';
import styles from './Home.module.scss';
import TaskService from '../../utils/data/task';
import { Task } from '../../types/Task';
import Lottie from 'lottie-react';
import Anim from '../../assets/anim.json';
import Loading from '../../assets/loading.json';
import { useFilter } from '../../hooks/useFilter';
import { Colors } from '../../types/Colors';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {

  const { search, color } = useFilter();

  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: TaskService.getTasks,
  });

  
  if (!data) return null
  console.log('render')

  const filteredTasks = data.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (color === Colors.Default || task.color === (color as string))
    );
  });

  const favTasks = filteredTasks.filter((task) => task.favorited);
  const otherTasks = filteredTasks.filter((task) => !task.favorited);

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <CreateTaskInput />
        {isLoading ? (
          <div className={styles.NotesContainer}>
            <div className={styles.NotesHeader}>
              <h3>
                Carregando...
                <Lottie animationData={Loading} className={styles.Loading} />
              </h3>
            </div>
            <div className={styles.NotesContent}>
              {filteredTasks.length >= 1 ? (
                filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                  />
                ))
              ) : (
                <div className={styles.NoTasks}>
                  <Lottie animationData={Anim} className={styles.Anim} />
                  <h3>Nenhuma nota encontrada</h3>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className={styles.NotesContainer}>
              <div className={styles.NotesHeader}>
                <h3>Favoritas</h3>
              </div>
              <div className={styles.NotesContent}>
                {favTasks.length >= 1 ? (
                  favTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                    />
                  ))
                ) : (
                  <div className={styles.NoTasks}>
                    <Lottie animationData={Anim} className={styles.Anim} />
                    <h3>Nenhuma nota favorita</h3>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.NotesContainer}>
              <div className={styles.NotesHeader}>
                <h3>Outras</h3>
              </div>
              <div className={styles.NotesContent}>
                {otherTasks.length >= 1 ? (
                  otherTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                    />
                  ))
                ) : (
                  <div className={styles.NoTasks}>
                    <h3>Nenhuma nota disponivel</h3>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
