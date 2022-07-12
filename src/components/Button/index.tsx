import { CgMathPlus } from 'react-icons/cg';
import styles from './styles.module.scss';

interface IButton {
  onClick: () => void;
  text: string;
  isLogged: boolean;
}

const Button = ({ onClick, text, isLogged }: IButton) => (
  <label
    htmlFor="button"
    className={`${styles.container}`}
    style={{ display: isLogged ? '' : 'none' }}

  >
    <CgMathPlus
      size={24}
      className={styles.icon}
    />
    <button
      id="button"
      className={styles.btn}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  </label>
);
export default Button;
