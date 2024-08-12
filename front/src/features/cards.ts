import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../types/Card';

const initialState = {
  favorites: [] as ICard[],
  noFavorites: [] as ICard[],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsReducer: (state, action) => {
      const { favorites, noFavorites } = action.payload;
      state.favorites = favorites;
      state.noFavorites = noFavorites;
    },
    updateCardReducer: (state, action) => {
      const card = action.payload;

      const filterCards = (cards: ICard[], card: ICard) => {
        return cards.filter((c) => c.id !== card.id);
      };

      const newFavorites = filterCards(state.favorites, card);
      const newNoFavorites = filterCards(state.noFavorites, card);

      if (card.isFavorite) {
        state.favorites = [card, ...newFavorites];
        state.noFavorites = newNoFavorites;
      } else {
        state.noFavorites = [card, ...newNoFavorites];
        state.favorites = newFavorites;
      }
    },
    deleteCardReducer: (state, action) => {
      const { cardId } = action.payload;
      state.favorites = state.favorites.filter((c) => c.id !== cardId);
      state.noFavorites = state.noFavorites.filter((c) => c.id !== cardId);
    },
  },
});

export const { setCardsReducer, updateCardReducer, deleteCardReducer } =
  cardsSlice.actions;
export default cardsSlice.reducer;
