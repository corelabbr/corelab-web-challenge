import { createContext, useState } from 'react';
import { Colors } from '../types/Colors';

interface FilterContextProps {
  search: string;
  color: Colors | undefined;
  setSearch: (value: string) => void;
  setColor: (value: Colors | undefined) => void;
}

export const FilterContext = createContext<FilterContextProps>({
  search: '',
  color: undefined,
  setSearch: (value: string): void => {},
  setColor: (value: Colors | undefined): void => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export function FilterContextProvider({ children }: ProviderProps) {

  const [search, setSearch] = useState<string>('');
  const [color, setColor] = useState<Colors | undefined>(undefined);

  return (
    <FilterContext.Provider
      value={{
        search,
        color,
        setSearch,
        setColor,
      }}
    >
      {children}
    </FilterContext.Provider>
  );

}