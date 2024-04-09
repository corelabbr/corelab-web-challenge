import useFetch from 'react-fetch-hook';
import { Header } from './components/Header';
import { NewNote } from './components/NewNote';
import Task from './lib/Task';
import { removeTrailingSlash } from './utils/util';
import { useEffect, useState } from 'react';
import API_URL from './services/api';
import { Note } from './components/Note';
import axios from 'axios';

function App() {
  const { data, isLoading } = useFetch<Array<Task>>(
    removeTrailingSlash(API_URL) + '/api/tasks',
  );

  const favoriteTasks = data?.filter((task) => task.favorite) ?? [];
  const unFavoriteTasks = data?.filter((task) => !task.favorite) ?? [];

  const [tasks, setTasks] = useState<Array<Task>>(data ?? []);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  useEffect(() => {
    if (data) {
      setTasks((prevTasks) => [...prevTasks, ...data]);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const removeTask = async (id: string) => {
    try {
      await axios.delete(removeTrailingSlash(API_URL) + `/api/tasks/${id}`);
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id.toString() !== id),
      );
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async (updatedTask: Task, selectedColor: string) => {
    try {
      const taskWithColor = { ...updatedTask, color: selectedColor };
      const response = await axios.put(
        removeTrailingSlash(API_URL) + `/api/tasks/${updatedTask.id}`,
        taskWithColor,
      );

      const updatedTasks = tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return { ...response.data, color: selectedColor };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="p-5 space-y-10">
          <div className="w-full flex justify-center">
            <NewNote newTask={addTask} />
          </div>
        </div>
        <div className="w-[1440px] mx-auto p-24 space-y-5">
          <div className="font-normal text-[#464646]">Favoritas</div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-start">
            {favoriteTasks.map((task) => (
              <div key={task.id}>
                <Note task={task} remove={removeTask} update={updateTask} />
              </div>
            ))}
          </div>

          <div className="font-normal text-[#464646]">Outras</div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-start">
            {unFavoriteTasks.map((task) => (
              <div key={task.id}>
                <Note task={task} remove={removeTask} update={updateTask} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
