import {
  createContext, ReactNode, useMemo, useState,
} from 'react';

type propsProvider = {
  children:ReactNode;
}

type typeContext = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export const menuMobileContext = createContext<typeContext>({} as typeContext);

export function MenuMobileProvider({ children }: propsProvider) {
  const [menuOpen, setMenuOpen] = useState(false);
  const setContext = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);

  return (
    <menuMobileContext.Provider value={setContext}>
      {children}
    </menuMobileContext.Provider>
  );
}
