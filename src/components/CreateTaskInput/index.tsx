import styles from './CreateTaskInput.module.scss';
import { FavoriteStar } from '../icons';
import { useState } from 'react';

const CreateTaskInput = () => {
  const [fav, setFav] = useState<boolean>(false);

  const handleFavorite = (): void => {
    setFav((value) => !value);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <input type="text" placeholder="Título" />
        <button onClick={() => handleFavorite()}>
          <FavoriteStar fill={fav ? '#FFA000' : 'none'} />
        </button>
      </div>
      <div className={styles.Content}>
        <textarea placeholder="Criar nota..." draggable />
      </div>
    </div>
  );
};

export default CreateTaskInput;
