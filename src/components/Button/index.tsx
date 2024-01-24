import { ReactNode } from 'react';
import styles from './Button.module.scss';

interface IButton {
  onClick: (e: any) => void;
  children: ReactNode;
  title: string;
}

const Button = ({ onClick, children, title }: IButton) => {
  return (
    <button type="button" title={title} className={styles.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
