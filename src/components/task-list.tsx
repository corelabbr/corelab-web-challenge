"use client";
import { useEffect, useState } from "react";
import { ITask, useTaskStore } from "../store/taskStore";
import { Loading } from "./loading";
import { TaskCard } from "./task-card";

export function TaskList() {
  const [isLoading, setIsLoading] = useState(true);
  const taskStore = useTaskStore((store) => store);
  const tasks = useTaskStore((state) => state.tasks);
  const filteredTasks = useTaskStore((state) => state.filteredTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      await taskStore.fetchTasks();
      setIsLoading(false);
    };
    fetchTasks();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <div>
            <h1 className="text-zinc-800 text-xl mb-7 pl-8">Favoritas</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center gap-14 sm:grid-cols-[repeat(auto-fill,minmax(470px,1fr))] mx-3">
              {(filteredTasks.length > 0 ? filteredTasks : tasks)
                ?.filter((task) => task.isFavorite)
                .map((task) => {
                  return <TaskCard task={task} key={task.id as string} />;
                })}
            </div>
          </div>
          <div>
            <h1 className="text-zinc-800 text-xl mb-7 pl-8">Outras</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center gap-14 sm:grid-cols-[repeat(auto-fill,minmax(470px,1fr))] mx-3">
              {(filteredTasks.length > 0 ? filteredTasks : tasks)
                ?.filter((task) => !task.isFavorite)
                .map((task) => {
                  return <TaskCard task={task} key={task.id as string} />;
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
