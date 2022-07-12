import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 

type InitialState = {
  editModalOpen:boolean,
  addModalOpen:boolean,
};

 
const initialState:InitialState = {
  editModalOpen: false,
  addModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    openEditModal: (state) => {
      state.editModalOpen = true;
    },
    closeEditModal: (state) => {
      state.editModalOpen = false;
    },
    openAddModal: (state) => {
      state.addModalOpen = true;
    },
    closeAddModal: (state) => {
      state.addModalOpen = false;
    },
  },
});

export const { openEditModal, closeEditModal, openAddModal, closeAddModal } =
  modalSlice.actions;
export default modalSlice.reducer;
