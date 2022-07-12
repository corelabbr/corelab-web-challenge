import styles from "../../styles/Input.module.scss";
import { IInput } from "../../types/IInput";

const Input = ({ value, type, onChange, id }: IInput) => {
  return (
    <div className={styles.item}>
      <label className={styles.label}>{value}</label>
      <input id={id} className={styles.input} type={type} onChange={onChange} />
    </div>
  );
};

export default Input;
