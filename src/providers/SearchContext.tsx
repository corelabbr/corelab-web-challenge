import React, { createContext, useState, ReactNode } from 'react';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchContext = createContext<SearchContextType>({
  searchTerm: '',
  setSearchTerm: () => {},
});

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
