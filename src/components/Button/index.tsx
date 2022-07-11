import { displayPartsToString } from "typescript";
import style from "./Button.module.scss"

interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return (
      <div className={style.Button}>
        <button onClick={props.onClick}>{props.text}</button>
      </div>
    ) 
  
};

export default Button;
