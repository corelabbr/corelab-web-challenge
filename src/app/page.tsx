"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import Todo from "./components/todo/editable-todo";
import NewTodo from "./components/todo/new-todo/new-todo";
import { api } from "./lib/axios";
import styles from "./page.module.scss";
import { useTodoStore } from "./stores/todo-store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const {
    increaseApiCallQuantity,
    apiCallQuantity,
    favoriteTodos,
    otherTodos,
    searchedTodos,
    setStoreTodos,
    updateStoreTodos,
  } = useTodoStore((state) => state);

  /**
   *
   * Since the API request always returns all the favorited items first and then the
   * remaining ones in creation order, when reaching the end of the scroll in the favorites
   * component or the 'other' component, the API will be called recursivily until
   * there are no more items to load.
   *
   */
  const [isTheLastTodos, setIsTheLastTodos] = useState(false);
  const [inMidRequest, setInMidRequest] = useState(false);
  const { ref: favoritesRef, inView: favoritesBottomInView } = useInView();
  const { ref: othersRef, inView: othersBottomInView } = useInView();

  const loadTodos = async (firstCall: boolean) => {
    if (inMidRequest || isTheLastTodos) return;

    setInMidRequest(true);
    try {
      const { data } = await api.get("/todos", {
        params: { skip: apiCallQuantity * 10 },
      });

      if (data.length === 0) setIsTheLastTodos(true);
      firstCall ? setStoreTodos(data) : updateStoreTodos(data);
      increaseApiCallQuantity();
    } catch {
      toast("Algum erro ocorreu ao recuperar seus todos. Tente novamente");
    } finally {
      setInMidRequest(false);
    }
  };

  useEffect(() => {
    loadTodos(true);
  }, []);

  useEffect(() => {
    if (othersBottomInView || favoritesBottomInView) {
      loadTodos(false);
    }
  }, [othersBottomInView, favoritesBottomInView]);

  return (
    <main className={`${styles.main} ${inter.className}`}>
      <NewTodo className={styles["new-todo"]} />
      {favoriteTodos.length > 0 && searchedTodos.length === 0 && (
        <div className={styles.favorites}>
          <p className={styles.label}>Favoritas</p>
          <div className={styles["favorite-todos-container"]}>
            {favoriteTodos.map((todo) => (
              <Todo key={todo.id} todoId={todo.id} {...todo} />
            ))}
            <div ref={favoritesRef} className={styles.loader}></div>
          </div>
        </div>
      )}
      {otherTodos.length > 0 && searchedTodos.length === 0 && (
        <div className={styles.other}>
          <p className={styles.label}>Outras</p>
          <div className={styles["todos-container"]}>
            {otherTodos.map((todo) => (
              <Todo key={todo.id} todoId={todo.id} {...todo} />
            ))}
            <div ref={othersRef} className={styles.loader}></div>
          </div>
        </div>
      )}
      {searchedTodos.length > 0 && (
        <div className={styles.searched}>
          <div className={styles["todos-container"]}>
            {searchedTodos.map((todo) => (
              <Todo key={todo.id} todoId={todo.id} {...todo} />
            ))}
            <div ref={othersRef} className={styles.loader}></div>
          </div>
        </div>
      )}
      {otherTodos.length === 0 &&
        favoriteTodos.length === 0 &&
        searchedTodos.length === 0 && (
          <p style={{ alignSelf: "center", marginTop: 50 }}>
            Nenhum todo foi encontrado
          </p>
        )}
    </main>
  );
}
