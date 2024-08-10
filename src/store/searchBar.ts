import { create } from "zustand";

interface StoreProps {
  searchBarValue: string;
  setSearchBarValue: (value: string) => void;
}

export const useSearchBar = create<StoreProps>((set) => ({
  searchBarValue: "",
  setSearchBarValue: (value: string) => {
    set({ searchBarValue: value });
  },
}));
