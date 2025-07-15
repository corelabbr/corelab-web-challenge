// src/components/ColorFilter/index.tsx

import styles from "./ColorFilter.module.scss";
import { COLOR_PALETTE } from "../../constants/colors";
import { FiX } from "react-icons/fi";

interface ColorFilterProps {
  selectedColor: string | null;
  onColorSelect: (color: string | null) => void;
}

const ColorFilter = ({ selectedColor, onColorSelect }: ColorFilterProps) => {
  return (
    <div className={styles.filterContainer}>
      <span>Filtrar por cor:</span>
      <div className={styles.palette}>
        {COLOR_PALETTE.map((color) => (
          <button
            key={color}
            className={`${styles.swatch} ${
              selectedColor === color ? styles.selected : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorSelect(color)}
          />
        ))}
        {/* Botão para limpar o filtro */}
        {selectedColor && (
          <button
            className={styles.clearButton}
            onClick={() => onColorSelect(null)}
          >
            <FiX size={19} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ColorFilter;
