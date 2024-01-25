"use client";

import React, { ChangeEvent, useRef, MouseEvent, useState, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { Colors } from "@/app/enums/colors";
import { saveTodo } from "@/app/store/features/todosSlice";
import { AppDispatch } from "@/app/store/store";

export function CreateTodo() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useDispatch<AppDispatch>();

  function createTodo() {
    dispatch(
      saveTodo({
        title,
        body,
        isFavorited,
        color: Colors.WHITE,
      })
    );

    setTitle("");
    setBody("");
    setIsFavorited(false);

    bodyRef.current?.click();
  }

  function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function updateBodyInputHeight(e: any) {
    e.target.style.height = "auto";
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (title.length > 0 && body.length > 0 && e.key === "Enter") {
      createTodo();
    }
  }

  return (
    <div className={styles.container} onKeyDown={onKeyDown}>
      <div className={styles.head}>
        <input type="text" value={title} placeholder="Título" onChange={(e) => setTitle(e.target.value)} />
        <FontAwesomeIcon icon={faStar} className={styles.favoriteStar} style={{ color: isFavorited ? "#ffa000" : "transparent" }} onClick={() => setIsFavorited((previous) => !previous)} />
      </div>

      <div className={styles.body}>
        <textarea value={body} onChange={onChange} placeholder="Criar nota..." ref={bodyRef} onClick={updateBodyInputHeight} />
      </div>

      {title.length > 0 && body.length > 0 && (
        <div className={styles.createTodosContainer}>
          <FontAwesomeIcon icon={faCheck} className={styles.icon} onClick={createTodo} />
        </div>
      )}
    </div>
  );
}
