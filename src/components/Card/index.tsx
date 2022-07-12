import React, { ReactNode } from "react";
import styles from "./Card.module.scss";

interface ICard {
  title: string;
  children: ReactNode;
  style?: any
  // { [key: string]: React.CSSProperties }
}

const Card = (props: ICard) => {
  return (
    <div className={styles.Card} style={props.style}>
      <h2>{props.title}</h2>

      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
