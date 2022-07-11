import React, { ReactNode, useContext } from 'react';
import {
  MdDelete,
  MdEdit, MdFavorite, MdOutlineFavoriteBorder,
} from 'react-icons/md';
import { setVehicleFavorite } from '../../lib/api';
import { UserContext } from '../../providers/UserAuthenticate';
import styles from './Card.module.scss';

interface ICard {
  title: string;
  children: ReactNode;
  color: string;
  idVehicle: number;
  isProprietary?: boolean;
  isFavorite?: boolean;
  changeFavorite?: () => Promise<void>;
}

const Card = ({
  title, children, color, idVehicle, isProprietary, isFavorite, changeFavorite,
}: ICard) => {
  const colorText = color.toLowerCase() === 'white' ? 'black' : 'white';
  const borderColor = color.toLowerCase() === 'white' ? '#333' : 'white';
  const { token } = useContext(UserContext);

  const handleFavorite = async () => {
    const isOk = await setVehicleFavorite(idVehicle, token);
    if (isOk && changeFavorite) {
      changeFavorite();
    }
  };

  return (
    <div className={styles.Card} style={{ backgroundColor: color, color: colorText, borderColor }}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div>
          {isProprietary && (
            <>
              <button type="button" onClick={() => console.log(idVehicle)}>
                <MdEdit />
              </button>
              <button type="button" onClick={() => console.log(idVehicle)}>
                <MdDelete />
              </button>
            </>
          )}

          {
            !isProprietary && !isFavorite && (
            <button type="button" onClick={() => handleFavorite()}>
              <MdOutlineFavoriteBorder />
            </button>
            )
          }

          {
            !isProprietary && isFavorite && (
            <button type="button" onClick={() => handleFavorite()}>
              <MdFavorite />
            </button>
            )
          }

        </div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Card;
