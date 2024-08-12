import { useContext } from "react";

import { ThemeContext } from "../context/theme";

export default function useTheme() {
  return useContext(ThemeContext);
}
