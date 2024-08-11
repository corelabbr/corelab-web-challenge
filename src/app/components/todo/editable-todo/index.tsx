"use client";

import { ChangeEvent, ComponentProps, useRef, useState } from "react";
import ColorPalett from "../../color-palet";
import IconWrapper from "../../icon-wrapper";
import ActiveStarIcon from "../../icons/active-star";
import FillIcon from "../../icons/fill";
import InactiveStarIcon from "../../icons/inactive-star";
import PencilIcon from "../../icons/pencil";
import XIcon from "../../icons/x";
import styles from "./editable-todo.module.scss";
import shared from "../shared.module.scss";
import generateDarkerHex from "../../utils/generate-darker-hex";
import useOutsideElementClick from "@/app/hooks/useOutsideElementClick";
import updateTodo from "@/app/services/update-todo";
import CheckmarkIcon from "../../icons/checkmark";
import { toast } from "react-toastify";
import changeTodoFavorite from "@/app/services/change-todo-favorite";
import { useTodoStore } from "@/app/stores/todo-store";
import deleteTodo from "@/app/services/delete-todo";

type TodoProps = ComponentProps<"div"> & {
  todoId?: number;
  title?: string;
  description?: string;
  color?: string;
  favorite?: boolean;
};

export default function Todo({
  todoId,
  title,
  description,
  color,
  favorite,
  ...props
}: TodoProps) {
  const { unfavoriteTodo, favoriteTodo, deleteStoreTodo } = useTodoStore(
    (state) => state
  );
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(description);
  const [todoColor, setTodoColor] = useState(color || "#FFFFFF");
  const [isFavorited, setIsFavorited] = useState(favorite);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isBeingEdited, setIsBeingedited] = useState(false);

  /**
   *
   * The color palette will close if a click
   * happens outside of it
   *
   */
  const wrapperRef = useRef(null);
  useOutsideElementClick(wrapperRef, () => setIsPaletteOpen(false));

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.currentTarget.value);
  };

  const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodoDescription(e.currentTarget.value);
  };

  const handlePalette = () => {
    setIsPaletteOpen(!isPaletteOpen);
  };

  const handleFavorite = () => {
    if (todoId) {
      changeTodoFavorite({ id: todoId, favorite: !isFavorited })
        .then(() => {
          if (isFavorited) {
            setIsFavorited(false);
            unfavoriteTodo(todoId);
          } else {
            setIsFavorited(true);
            favoriteTodo(todoId);
          }
        })
        .catch((e) => {
          toast("Algum erro ocorreu ao tentar favoritar o todo");
        });
    }
  };

  const handleDelete = () => {
    if (todoId) {
      deleteTodo(todoId)
        .then(() => deleteStoreTodo(todoId))
        .catch(() => {
          toast(
            "Um erro ocorreu ao deletar seu todo. Tente novamente mais tarde"
          );
        });
    }
  };

  const handleEdit = () => {
    if (!isBeingEdited) {
      setIsBeingedited(true);
    } else {
      if (todoId) {
        updateTodo({
          id: todoId,
          ...(todoTitle != title && { title: todoTitle }),
          ...(todoDescription != description && {
            description: todoDescription,
          }),
        })
          .then(() => {
            setIsBeingedited(false);
          })
          .catch(() => {
            toast.warning("Algum erro ocorreu durante a atualização do todo");
          });
      }
    }
  };

  const darkerTodoHex = generateDarkerHex(todoColor);

  return (
    <div
      {...props}
      style={{ ...props.style, backgroundColor: todoColor }}
      className={`
        ${shared.todo} 
        ${styles.todo} 
        ${favorite && styles} 
        ${props.className}
      `}
    >
      <div className={shared.head}>
        <input
          name="Título"
          title="Insira um título em sua nota"
          type="text"
          placeholder="Título"
          value={todoTitle}
          onChange={handleTitle}
          disabled={!isBeingEdited}
        />
        <div className={shared["favorite-container"]} onClick={handleFavorite}>
          {isFavorited ? <ActiveStarIcon /> : <InactiveStarIcon />}
        </div>
      </div>
      <div className={`${shared.body}`}>
        <textarea
          name="Descrição"
          title="Insira uma descrição em sua nota"
          placeholder="Clique ou arraste o arquivo para esta área para fazer upload"
          value={todoDescription}
          rows={1000}
          onChange={handleDescription}
          disabled={!isBeingEdited}
        />
        <div className={styles.foot}>
          <div>
            <IconWrapper onClick={handleEdit} color={darkerTodoHex}>
              {isBeingEdited ? <CheckmarkIcon /> : <PencilIcon />}
            </IconWrapper>
            <IconWrapper onClick={handlePalette} color={darkerTodoHex}>
              <FillIcon />
            </IconWrapper>
          </div>
          <IconWrapper onClick={handleDelete} color={darkerTodoHex}>
            <XIcon />
          </IconWrapper>
        </div>
      </div>
      {isPaletteOpen && (
        <div ref={wrapperRef}>
          <ColorPalett
            stateCallback={setTodoColor}
            todoId={todoId}
            onClick={handlePalette}
          />
        </div>
      )}
    </div>
  );
}
