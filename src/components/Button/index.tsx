import { AiOutlinePlus } from "react-icons/ai";
import styles from "../../styles/Button.module.scss";

interface IButton {
  onClick: (event: React.MouseEvent<HTMLElement>)=>void;
  text: string;
  add?: boolean;
}

const Button = (props: IButton) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.Button} ${props.add && styles.extraButtonStyle}`}
    >
      {props.add && (
        <span className={styles.Button_icon}>
          <AiOutlinePlus />
        </span>
      )}
      <span className={styles.Button_text}>{props.text}</span>
    </button>
  );
};

export default Button;
