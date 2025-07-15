import styles from "./ColorPalette.module.scss";
import { COLOR_PALETTE } from "../../constants/colors";

interface IColorPaletteProps {
  onColorSelect: (color: string) => void;
}
function ColorPalette({ onColorSelect }: IColorPaletteProps) {
  const colors = COLOR_PALETTE;

  return (
    <div className={styles.palette}>
      {colors.map((color) => (
        <button
          key={color}
          className={styles.swatch}
          style={{ backgroundColor: color }}
          aria-label={`Selecionar cor ${color}`}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
}

export default ColorPalette;
