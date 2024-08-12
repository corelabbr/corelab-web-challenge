import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CardMaker from '../components/CardMaker';
import RenderCards from '../components/RenderCards';

import { listCards } from '../services/listCards';

import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { setCardsReducer } from '../features/cards';
import { URLDefault } from '../utils/ulrDefault';

const Home = () => {
  const { search } = useSelector((state: RootState) => state.params);
  const { favorites, noFavorites } = useSelector(
    (state: RootState) => state.cardsState,
  );

  const dispatch = useDispatch();

  const urlFavorite = URLDefault(true, search);
  const urlNotFavorite = URLDefault(false, search);

  const fetchCards = async () => {
    const cardsFavorites = await listCards(urlFavorite);
    const cardsNotFavorites = await listCards(urlNotFavorite);

    dispatch(
      setCardsReducer({
        favorites: cardsFavorites,
        noFavorites: cardsNotFavorites,
      }),
    );
  };

  useEffect(() => {
    fetchCards();
  }, [search]);

  return (
    <main>
      <CardMaker />
      <ul className="p-0 mx-3 mx-md-5 my-5">
        <RenderCards cardList={favorites} />
        <RenderCards cardList={noFavorites} />
      </ul>
    </main>
  );
};

export default Home;
