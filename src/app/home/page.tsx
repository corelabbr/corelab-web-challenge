import React from "react";
import TaskCards from "@/components/TaskCards/page";
import styles from "@/assets/styles/pages/home.module.sass";
import Header from "@/components/Header/page";
import Loading from "@/components/Loading/loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export const dataTask = async () => {
  const response = await fetch(`${process.env.API}/allUsers`, {
    method: "GET",
    cache: "no-cache",
  });
  const data = response.json();
  return data;
};

export default async function Home() {
  const user: any = await dataTask();
  console.log({ user });
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerAddTask}>
        <span>
          Titulo:
          <input id="title" type="text" placeholder="titulo da tarefa" />
        </span>
        <hr />
        <span>
          Tarefa:
          <input type="text" placeholder="digite aqui a nota" />
        </span>

        <button className={styles.btnAddTask}>Adicionar</button>
      </div>
      <div className={styles.favoritos}>
        <span>Favoritas</span>
        <TaskCards />
      </div>
      <div className={styles.outras}>
        <span>Outras</span>
        <TaskCards />
      </div>
    </div>
  );
}
