import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Colors } from "@/app/enums/colors";

interface GeneralState {
  search: string;
  showFavorited: boolean;
  showNonFavorited: boolean;
  colorFilter: Colors | null;
}

const initialState: GeneralState = {
  search: "",
  showFavorited: true,
  showNonFavorited: true,
  colorFilter: null,
};

export const generalStateSlice = createSlice({
  name: "generalState",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setShowFavorited: (state, action: PayloadAction<boolean>) => {
      state.showFavorited = action.payload;
    },
    setShowNonFavorited: (state, action: PayloadAction<boolean>) => {
      state.showNonFavorited = action.payload;
    },
    setColorFilter: (state, action: PayloadAction<Colors | null>) => {
      state.colorFilter = action.payload;
    },
  },
});

export const { setSearch, setShowFavorited, setShowNonFavorited, setColorFilter } = generalStateSlice.actions;

export const selectSearch = (state: RootState) => state.generalState.search;
export const selectShowFavorited = (state: RootState) => state.generalState.showFavorited;
export const selectShowNonFavorited = (state: RootState) => state.generalState.showNonFavorited;
export const selectColorFilter = (state: RootState) => state.generalState.colorFilter;

export default generalStateSlice.reducer;
