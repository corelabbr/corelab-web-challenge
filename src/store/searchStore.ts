import { create } from 'zustand';

interface IStore {
  searchValue: string
  setSearchValue: (value: string) => void
}

export const useSearchStore = create<IStore>((set) => ({
  searchValue: '',
  setSearchValue: (value: string) => {
    set({ searchValue: value });
  },
}));