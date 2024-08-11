"use client";
import { ChangeEvent, ComponentProps, useState } from "react";
import ActiveStarIcon from "../../icons/active-star";
import InactiveStarIcon from "../../icons/inactive-star";
import shared from "../shared.module.scss";
import styles from "./new-todo.module.scss";
import createTodo from "@/app/services/create-todo";
import { toast } from "react-toastify";
import { useTodoStore } from "@/app/stores/todo-store";

type NewTodoProps = ComponentProps<"div">;

export default function NewTodo({ ...props }: NewTodoProps) {
  const createStoreTodo = useTodoStore((state) => state.createStoreTodo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleCreate = () => {
    createTodo({
      title: title,
      description: description,
      favorite: isFavorite,
    })
      .then((res) => {
        setTitle("");
        setDescription("");
        setIsFavorite(false);
        setIsFocused(false);
        createStoreTodo(res.data);
      })
      .catch(() => {
        toast(
          "Um problema ocorreu ao tentar criar seu todo. Tente novamente mais tarde"
        );
      });
  };

  return (
    <div
      {...props}
      style={{
        ...props.style,
        backgroundColor: "#FFFFFF",
        ...(isFocused && { height: "300px" }),
      }}
      onMouseOver={() => {
        setIsFocused(true);
      }}
      onMouseLeave={() => {
        setIsFocused(false);
      }}
      className={`${props.className} ${shared.todo} ${styles.shadow}`}
    >
      <div className={shared.head}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={handleTitle}
        />
        <div className={shared["favorite-container"]} onClick={handleFavorite}>
          {isFavorite ? <ActiveStarIcon /> : <InactiveStarIcon />}
        </div>
      </div>
      <div className={shared.body}>
        <textarea
          placeholder="Criar nota..."
          value={description}
          rows={1000}
          style={{ overflow: isFocused ? "auto" : "hidden" }}
          onChange={handleDescription}
        />
      </div>
      {(title.trim().length !== 0 || description.trim().length !== 0) && (
        <button
          onClick={handleCreate}
          className={`${styles.button} ${styles.shadow}`}
        >
          Salvar
        </button>
      )}
    </div>
  );
}
