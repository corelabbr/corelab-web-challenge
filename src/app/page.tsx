"use client";

import { useEffect, useMemo } from "react";
import { TaskContainer } from "@/components/task-contaniner";
import { useColorStore, useTasksStore } from "@/libs/zustend";
import { APP_HOST } from "@/config/app";
import { Header } from "@/components/header";
import { PostTask } from "@/components/post-tak-area";

interface IColorsDataApiResponse {
  id: number;
  color: string;
  value: string;
}
async function getDataFromServer() {
  const taskResponse = await fetch(`${APP_HOST}/api/task/`);
  const tasksData = (await taskResponse.json()) as IApiResponse;

  const colorsResponse = await fetch(`${APP_HOST}/api/settings/colors`);
  const colorsData = (await colorsResponse.json()) as IApiResponse;
  return {
    colorsData,
    tasksData,
  };
}

export const dynamic = "force-dynamic";

export default function Home() {
  const { tasks, setTasks, searchQuery } = useTasksStore();
  const { colors, setColors } = useColorStore();

  useEffect(() => {
    getDataFromServer().then((res) => {
      if (res.colorsData.isOk) {
        setColors(res.colorsData.data);
      } else {
        alert(res.colorsData.message);
      }
      if (res.tasksData.isOk) {
        setTasks(res.tasksData.data);
      } else {
        alert("Problemas ao fazer requisição HTTP");
      }
    });
  }, [setTasks]);

  const filteredTasks = tasks.filter(
    (task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const { favoriteNotes, nonFavoriteNotes } = useMemo(() => {
    const favoriteNotes: ITask[] = [];
    const nonFavoriteNotes: ITask[] = [];

    filteredTasks.forEach((note) => {
      if (note.isFavorite) {
        favoriteNotes.push(note);
      } else {
        nonFavoriteNotes.push(note);
      }
    });

    return { favoriteNotes, nonFavoriteNotes };
  }, [filteredTasks]);

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      <Header />
      <div className="flex flex-col items-center py-8 gap-y-10">
        <PostTask />
        <div className="container m-auto p-8 *:text-[#455a64] ">
          <TaskContainer legend="Favoritas" notes={favoriteNotes} />
          <TaskContainer legend="Outras" notes={nonFavoriteNotes} />
        </div>
      </div>
    </main>
  );
}
