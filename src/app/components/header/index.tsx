"use client";

import { useState } from "react";
import MagnifierIcon from "../icons/magnifier";
import NoteIcon from "../icons/note";
import XIcon from "../icons/x";
import styles from "./header.module.scss";
import { useDebouncedCallback } from "use-debounce";
import findTodosByTitle from "@/app/services/find-todos-by-title";
import { title } from "process";
import { toast } from "react-toastify";
import { useTodoStore } from "@/app/stores/todo-store";

export default function Header() {
  const setSearchedTodos = useTodoStore((state) => state.setSearchedTodos);
  const [search, setSearch] = useState("");

  const debounce = useDebouncedCallback(() => {
    if (search.trim().length !== 0) {
      findTodosByTitle(search)
        .then((res) => setSearchedTodos(res.data))
        .catch((e) => {
          console.log(e);
          toast(
            "Houve um erro ao procurar seus todos. Tente novamente mais tarde"
          );
        });
    } else {
      setSearchedTodos([]);
    }
  }, 1500);

  return (
    <header className={styles.header}>
      <NoteIcon className={styles["note-icon"]} />
      <p>CoreNotes</p>
      <div className={styles["search-bar"]}>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            debounce();
          }}
          placeholder="Pesquisar notas"
        />
        <MagnifierIcon className={styles["magnifier-icon"]} />
      </div>
      <XIcon className={styles["x-icon"]} />
    </header>
  );
}
