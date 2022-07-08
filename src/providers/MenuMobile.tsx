import React, { createContext, useMemo, useState } from 'react';

type propsProvider = {
  children: React.ReactNode;
}

type typeContext = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export const menuMobileContext = createContext<typeContext>({
  menuOpen: false,
  setMenuOpen: () => {},
});

export function MenuMobileProvider({ children }: propsProvider) {
  const [menuOpen, setMenuOpen] = useState(false);
  const setContext = useMemo(() => ({ menuOpen, setMenuOpen }), [menuOpen]);

  return (
    <menuMobileContext.Provider value={setContext}>
      {children}
    </menuMobileContext.Provider>
  );
}
