"use client";

import { CreateTodo } from "./components/CreateTodo/CreateTodo";
import { fetchTodos, selectAllTodos, selectAreTodosLoading } from "./store/features/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.scss";
import TodosList from "./components/TodosList/TodosList";
import Loading from "./components/Loading/Loading";
import { useEffect } from "react";
import { AppDispatch } from "./store/store";

export default function Home() {
  const areTodosLoading = useSelector(selectAreTodosLoading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <CreateTodo />
      <br />
      {areTodosLoading ? <Loading /> : <TodosList />}
    </main>
  );
}
