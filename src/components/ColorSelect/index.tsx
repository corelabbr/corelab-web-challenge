import { Palette } from "lucide-react";
import styles from "./ColorSelect.module.scss";
import { useState } from "react";

const colorOptions = {
  orange: "#FFA500",
  lime: "#BFFF00",
  aqua: "#00FFFF",
  yellow: "#FFEB3B",
  pink: "#FF69B4",
  lightBlue: "#40C4FF",
  lightGreen: "#8BC34A",
  peach: "#FFDAB9",
  mint: "#98FF98",
  lavender: "#E6E6FA",
};

interface Props {
  onChange: (color: string) => void;
}

const ColorSelect = ({ onChange }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className={styles.ColorSelect} onClick={toggleVisibility}>
      <Palette size={16} />
      {isVisible && (
        <div className={styles.colorOptions}>
          {Object.entries(colorOptions).map(([colorName, colorValue]) => (
            <button
              key={colorName}
              style={{ backgroundColor: colorValue, padding: '0.5rem' }}
              className={styles.colorOption}
              onClick={() => onChange(colorValue)}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelect;

