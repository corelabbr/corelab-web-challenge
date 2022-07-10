import { useEffect } from "react";
import styles from "./SaveButton.module.scss";

interface IButton {
  onClick: () => void;
  text: string;
  style: object;
}

const SaveButton = (props: IButton) => {
  return (
    <>
      <button className={styles.Button} style={props.style} onClick={props.onClick}>
        {props.text}
      </button>
    </>
  );
};

export default SaveButton;
