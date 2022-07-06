import { CgMathPlus } from 'react-icons/cg';
import styles from './styles.module.scss';

interface IButton {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: IButton) => (
  <label htmlFor="button" className={styles.container}>

    <CgMathPlus
      size={24}
      className={`${styles.clickable} ${styles.icon}`}
    />
    <button
      className={styles.btn}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  </label>
);
export default Button;
