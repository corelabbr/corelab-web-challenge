import React, { ReactNode } from "react";
import styles from "./Card.module.scss";
import { IoHeart, IoRemove, IoCreate } from "react-icons/io5";

interface ICard {
  title?: string;
  children: ReactNode;
  headerComponent: ReactNode
  style?: React.CSSProperties
}

const Card = (props: ICard) => {
  return (
    <div style={props.style} className={styles.Card}>
      {props.headerComponent}
      <h2 className="text-capitalize mb-1 text-truncate" style={{  }}>{props.title}</h2>

      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
