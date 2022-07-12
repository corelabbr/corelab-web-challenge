import styles from "./Button.module.scss"

interface IButton {
  onClick: () => void;
  text: string;
}

const Button = (props: IButton) => {
  return <button className={styles.Button} onClick={props.onClick}>{props.text}</button>;
};

export default Button;
