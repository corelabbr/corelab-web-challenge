import React, { ReactNode } from "react";
import styles from "./Card.module.scss";

interface ICard {
  title: string;
  children: ReactNode;
}

const Card = (props: ICard) => {
  return (
    <div className={styles.Card}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <img src='./assets/editItem.svg' alt='Editar' />
        <img src='./assets/removeItem.svg' alt='Editar' />
        <img src='./assets/favItem.svg' alt='Editar' />
      </div>
      <h2 className={styles.h2}>{props.title}</h2>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
