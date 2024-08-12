import { combineReducers } from '@reduxjs/toolkit';

import loadingReducer from '../features/loading';
import modalReducer from '../features/modal';
import paramsReducer from '../features/params';
import cardsReducer from '../features/cards';

const rootReducer = combineReducers({
  loading: loadingReducer,
  modal: modalReducer,
  params: paramsReducer,
  cardsState: cardsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
