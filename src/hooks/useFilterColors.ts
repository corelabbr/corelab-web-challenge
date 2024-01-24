import { colors } from "../components/Main/Note/ColorPicker/ColorPicker";
export const useFilterColors = () => {
  const colorsFilter: Record<string, string[]> = {}
  colors.forEach((colorItem) => {
    if (colorsFilter[colorItem.name]) {
      colorsFilter[colorItem.name] = [
        ...colorsFilter[colorItem.name],
        colorItem.color,
      ]
    } else {
      colorsFilter[colorItem.name] = [colorItem.color];
    }
  })
  return colorsFilter;
};