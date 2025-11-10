import React, { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import star from '../../assets/star.png';
import filledStar from '../../assets/FullFilledStar.png';
import { postTask } from '../../lib/api';
import { toast } from 'react-toastify';

const Register = ({ fetchTasks }: { fetchTasks: () => void }) => {
  const [favoriteState, setFavoriteState] = useState<boolean>(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    taskContent: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      isFavorite: favoriteState,
    };

    try {
      await postTask(data);
      toast.success('Task cadastrada com sucesso!');
      setFormData({ title: '', taskContent: '' });
      setFavoriteState(false);
      setIsExpanded(false);
      fetchTasks();
    } catch (error) {
      toast.error('Error ao cadastrar');
    }
  };

  const actualStar = favoriteState ? filledStar : star;

  const handleFavorite = async () => {
    favoriteState ? setFavoriteState(false) : setFavoriteState(true);
  };

  const handleExpandForm = () => {
    setIsExpanded(true);
  };

  const handleOverlayClick = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    setFavoriteState(favoriteState);
  }, [favoriteState]);

  return (
    <>
      <div className={`${styles.overlay} ${isExpanded ? styles.active : ''}`} onClick={handleOverlayClick}></div>
      <form
        className={`${styles.registerCard} ${isExpanded ? styles.expanded : ''}`}
        onSubmit={handleSubmit}
        onClick={handleExpandForm}
      >
        <div className={styles.registerCardheader}>
          <input
            type="text"
            className={styles.registerCardTitle}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título"
            maxLength={25}
          />
          <img
            src={actualStar}
            alt="Descrição da Imagem"
            style={{ width: '18px', height: '17px' }}
            onClick={handleFavorite}
            className={styles.registerCardStar}
          />
        </div>
        <div className={styles.separator} />
        <textarea
          className={styles.registerCardContent}
          value={formData.taskContent}
          name="taskContent"
          onChange={handleChange}
          placeholder="Criar nota..."
          maxLength={100}
        />

        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </form>
    </>
  );
};

export default Register;
