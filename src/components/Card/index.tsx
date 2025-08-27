import { ReactNode } from 'react';
import styles from './Card.module.scss';
import classNames from 'classnames';

interface CardProps {
  children: ReactNode;
  colorHex?: string;
  variant?: 'default' | 'add';
}

const Card = ({ children, colorHex, variant = 'default' }: CardProps) => {
  return (
    <div 
      className={classNames(styles.Card, {
        [styles.addCard]: variant === 'add'
      })} 
      style={{ backgroundColor: colorHex || undefined }}
    >
      {children}
    </div>
  );
};

export default Card;
