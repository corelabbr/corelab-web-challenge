import { createSlice } from '@reduxjs/toolkit';
import { ICardMaker } from '../types/CardMaker';

interface ModalState {
  id?: number;
  show: boolean;
  typeModal?: 'save' | 'edit' | 'delete';
  idItem?: number;
  content?: any;
  dataSubmit?: ICardMaker;
}

const initialState: ModalState = {
  show: false,
  typeModal: undefined,
  idItem: undefined,
  content: undefined,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.show = true;
    },
    hideModal: (state) => {
      state.show = false;
    },
    setModalData: (state, action) => {
      const { payload } = action;
      Object.keys(payload).forEach((key) => {
        state[key as keyof ModalState] = payload[key];
      });
      state.show = true;
    },
    setId: (state, action) => {
      state.idItem = action.payload;
      state.typeModal = 'edit';
    },
    reset: (state) => {
      state.show = false;
      Object.keys(state).forEach((key) => {
        state[key as keyof ModalState] = undefined;
      });
    },
  },
});

export const { showModal, hideModal, setModalData, setId, reset } =
  modalSlice.actions;
export default modalSlice.reducer;
