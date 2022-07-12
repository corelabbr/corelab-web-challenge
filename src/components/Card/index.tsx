import React, { ReactNode, useContext } from 'react';
import {
  MdDelete,
  MdEdit, MdFavorite, MdOutlineFavoriteBorder,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { deleteVehicle, setVehicleFavorite } from '../../lib/api';
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
  editFavorite?: (id: number) => Promise<void>;
  isAll?: boolean;
}

const Card = ({
  title, children, color, idVehicle, isProprietary,
  isFavorite, changeFavorite, editFavorite, isAll,
}: ICard) => {
  const colorText = color.toLowerCase() === 'white' ? 'black' : 'white';
  const borderColor = color.toLowerCase() === 'white' ? '#333' : 'white';
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handleFavorite = async () => {
    const isOk = await setVehicleFavorite(idVehicle, token);
    if (isOk && changeFavorite) {
      changeFavorite();
    }
  };

  const handleEdit = () => {
    if (editFavorite) {
      editFavorite(idVehicle);
    }
  };

  const handleDelete = async () => {
    const isOk = await deleteVehicle(idVehicle, token);
    if (isOk) {
      navigate('/my-vehicles');
    }
  };

  return (
    <div className={styles.Card} style={{ backgroundColor: color, color: colorText, borderColor }}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div>
          {isProprietary && !isAll && (
            <>
              <button type="button" onClick={handleEdit}>
                <MdEdit />
              </button>
              <button type="button" onClick={handleDelete}>
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
