import { createSlice } from '@reduxjs/toolkit';

interface LoadingState {
  show: boolean;
}

const initialState: LoadingState = {
  show: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.show = true;
    },
    hideLoading: (state) => {
      state.show = false;
    },
  },
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
