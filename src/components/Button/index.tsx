import React from "react";
import styles from "./Button.module.scss";

interface IButton {
  onClick: (e: React.MouseEvent) => void;
  text: string;
  destaque?: boolean;
}

const Button = (props: IButton) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.Button} ${props.destaque ? styles.Destaque : ""}`}
    >
      {props.text}
    </button>
  );
};

export default Button;
