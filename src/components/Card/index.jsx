import React from "react";
import styles from "./Card.module.scss";

const Card = ({
  onFavorite,
  onDelete,
  onEdit,
  children,
  title,
  color,
  isFav,
}) => {
  return (
    <div className={styles.Card} style={{ backgroundColor: color }}>
      <div className={styles.buttons}>
        <button onClick={onFavorite}>
          <span
            className="material-symbols-outlined"
            style={{ color: isFav ? "red" : "black" }}
          >
            favorite
          </span>
        </button>
        <button onClick={onDelete}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <button onClick={onEdit}>
          <span className="material-symbols-outlined">edit_note</span>
        </button>
      </div>
      <h2>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
