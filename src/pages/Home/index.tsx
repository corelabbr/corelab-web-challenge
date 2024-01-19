import { TaskCard } from '../../components';
import CreateTaskInput from '../../components/CreateTaskInput';
import styles from './Home.module.scss';
import TaskService from '../../utils/data/task';
import { useEffect, useState } from 'react';
import { Task } from '../../types/Task';
import Lottie from "lottie-react";
import Anim from '../../assets/anim.json';

const HomePage = () => {
  

  const [tasks, setTasks] = useState<Task[] | []>([]);

  useEffect(() => {
    const newTasks = TaskService.getTasks();
    setTasks(newTasks);
  }, []);

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const favTasks = tasks.filter((task) => task.favorited);
  const otherTasks = tasks.filter((task) => !task.favorited);

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <CreateTaskInput />
        <div className={styles.NotesContainer}>
          <div className={styles.NotesHeader}>
            <h3>Favoritas</h3>
          </div>
          <div className={styles.NotesContent}>
            {favTasks.length >= 1 ? favTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskUpdate={handleTaskUpdate}
              />
            )) : (
              <div className={styles.NoTasks}>
                <Lottie animationData={Anim} className={styles.Anim} />
                <h3>Nenhuma tarefa favoritada</h3>
              </div>
            )}
          </div>
        </div>
        <div className={styles.NotesContainer}>
          <div className={styles.NotesHeader}>
            <h3>Outras</h3>
          </div>
          <div className={styles.NotesContent}>
            {otherTasks.length >= 1 ? otherTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskUpdate={handleTaskUpdate}
              />
            )) : (
              <div className={styles.NoTasks}>
                <h3>Nenhuma tarefa disponivel</h3>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
