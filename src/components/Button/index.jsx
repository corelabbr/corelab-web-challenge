import styles from "./Button.module.scss";

const Button = ({ text, onClick }) => {
  return (
    <button className={styles.main} onClick={onClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default Button;
