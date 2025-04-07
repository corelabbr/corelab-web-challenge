import React from "react";
import styles from "../../styles/Card.module.scss";
import { ICardProps } from "../../types/CardTypes";

const Card = (props: ICardProps) => {
  return (
    <div className={styles.Card}>
      <h2>{props.title}</h2>

      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
