import { createContext, useState } from 'react'
import { Colors } from '../types/Colors'

interface FilterContextProps {
  search: string;
  color: Colors;
  setSearch: (value: string) => void;
  setColor: (value: Colors) => void;
}

export const FilterContext = createContext<FilterContextProps>({
  search: '',
  color: Colors.Default,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setSearch: (value: string): void => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  setColor: (value: Colors): void => {},
})

interface ProviderProps {
  children: React.ReactNode;
}

export function FilterContextProvider({ children }: ProviderProps) {
  const [search, setSearch] = useState<string>('')
  const [color, setColor] = useState<Colors>(Colors.Default)

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
  )
}
