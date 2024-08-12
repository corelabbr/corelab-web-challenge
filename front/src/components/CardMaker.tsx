import { MdStarRate, MdOutlineStarRate, MdErrorOutline } from 'react-icons/md';

import '../styles/cardMaker.scss';
import '../styles/tooltip.scss';

import { motion } from 'framer-motion';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { createCard } from '../middlewares/cardMaker';
import { ICardMaker } from '../types/CardMaker';
import Tooltip from './Tooltip';
import { createCardService } from '../services/createCard';
import { updateCardReducer } from '../features/cards';
import { useDispatch } from 'react-redux';

const CardMaker = () => {
  const dispatch = useDispatch();

  const [isFavorite, setIsFavorite] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICardMaker>({
    resolver: yupResolver(createCard),
  });

  const onSubmit = async (data: ICardMaker) => {
    const content = {
      ...data,
      isFavorite,
    };

    const newCard = await createCardService(content);
    newCard.id && dispatch(updateCardReducer(newCard));

    reset();
    setIsFavorite(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const HandleStar = () => {
    const props = {
      size: 30,
      onClick: () => setIsFavorite(!isFavorite),
    };

    return isFavorite ? (
      <MdStarRate fill="#FFCC00" {...props} />
    ) : (
      <MdOutlineStarRate fill="#979797" {...props} />
    );
  };

  const errorMessage = errors?.description?.message || errors?.title?.message;

  return (
    <section className="w-100 d-flex flex-wrap align-items-center justify-content-center mt-5">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="cardMaker w-75 d-flex flex-column align-items-center"
      >
        <form onKeyDown={handleKeyDown} className="w-100">
          <header className="w-100 px-4 py-2 d-flex align-items-center justify-content-between border-bottom border-2 position-relative">
            <input
              type="text"
              placeholder="Título"
              {...register('title')}
              className={errors.title ? 'is-invalid' : ''}
            />
            <HandleStar />
          </header>
          <div className="position-relative">
            <div
              className="d-flex flex-column position-absolute bottom-0"
              style={{ right: '8px' }}
            >
              {errorMessage && (
                <Tooltip text={errorMessage}>
                  <MdErrorOutline size={24} color="red" />
                </Tooltip>
              )}
            </div>
            <textarea
              id="descriptionCard"
              placeholder="Criar nota..."
              {...register('description')}
              className={errors.description ? 'is-invalid' : ''}
            ></textarea>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default CardMaker;
