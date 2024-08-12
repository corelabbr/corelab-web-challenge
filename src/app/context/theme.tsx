"use client";

import { getCookie, setCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme | string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme | string>("");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme);
  };

  useEffect(() => {
    const cookie = getCookie("theme");
    if (!cookie) {
      setCookie("theme", "light");
    }
    setTheme(cookie || "light");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
