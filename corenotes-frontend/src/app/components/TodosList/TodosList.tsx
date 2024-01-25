import { selectColorFilter, selectSearch, selectShowFavorited, selectShowNonFavorited } from "@/app/store/features/generalStateSlice";
import { selectFavoritedTodos, selectNonFavoritedTodos } from "@/app/store/features/todosSlice";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { Todo } from "@/app/models/todo";
import { TodoCard } from "../TodoCard/TodoCard";

export default function TodosList() {
  const favoritedTodos = useSelector(selectFavoritedTodos);
  const nonfavoritedTodos = useSelector(selectNonFavoritedTodos);
  const search = useSelector(selectSearch);
  const showFavorited = useSelector(selectShowFavorited);
  const showNonFavorited = useSelector(selectShowNonFavorited);
  const colorFilter = useSelector(selectColorFilter);

  function filterList(todoList: Todo[]): Todo[] {
    return todoList
      .toReversed()
      .filter((todo) => todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || todo.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      .filter((todo) => todo.color === colorFilter || colorFilter === null);
  }

  return (
    <div className={styles.container}>
      {showFavorited && (
        <>
          {favoritedTodos.length > 0 && <p>Favoritas</p>}

          <ul>
            {filterList(favoritedTodos).map((todo) => (
              <li key={todo.id}>
                <TodoCard id={todo.id} title={todo.title} body={todo.body} isFavorited={todo.isFavorited} color={todo.color} />
              </li>
            ))}
          </ul>
        </>
      )}

      {showNonFavorited && (
        <>
          {favoritedTodos.length > 0 && nonfavoritedTodos.length > 0 && <p>Outras</p>}
          {favoritedTodos.length === 0 && nonfavoritedTodos.length > 0 && <p>Todas</p>}

          <ul>
            {filterList(nonfavoritedTodos).map((todo) => (
              <li key={todo.id}>
                <TodoCard id={todo.id} title={todo.title} body={todo.body} isFavorited={todo.isFavorited} color={todo.color} />
              </li>
            ))}
          </ul>
        </>
      )}

      {favoritedTodos.length === 0 && nonfavoritedTodos.length === 0 && <p className={styles.no_todo_addded_text}>Nenhuma tarefa adicionada :(</p>}
    </div>
  );
}
