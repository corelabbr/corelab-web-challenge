import React, { ReactNode } from 'react';
import styles from './Card.module.scss';

interface ICard {
  title: string;
  children: ReactNode;
  color: string;
}

const Card = ({ title, children, color }: ICard) => (
  <div className={styles.Card} style={{ backgroundColor: color }}>
    <div>

      <h2>{title}</h2>
    </div>

    <div className={styles.content}>{children}</div>
  </div>
);

export default Card;
