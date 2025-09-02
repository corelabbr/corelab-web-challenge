import { JSX } from 'react';
import s from './styles.module.scss';

interface ButtonProps {
  text: string;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, type, onClick }: ButtonProps): JSX.Element => {
  return (
    <button className={s.button} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
