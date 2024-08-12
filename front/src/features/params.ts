import { createSlice } from '@reduxjs/toolkit';

interface ParamsState {
  search?: string;
}

const initialState: ParamsState = {
  search: undefined,
};

const params = createSlice({
  name: 'params',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = params.actions;
export default params.reducer;
