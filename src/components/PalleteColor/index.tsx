import styles from "./PalleteColor.module.scss";
interface IPaletteColor {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const PaletteColor = ({ selectedColor, onSelectColor }: IPaletteColor) => {
  const colors = [
    "#FFCDD2",
    "#F8BBD0",
    "#E1BEE7",
    "#D1C4E9",
    "#C5CAE9",
    "#BBDEFB",
    "#B3E5FC",
    "#B2EBF2",
    "#B2DFDB",
    "#C8E6C9",
    "#DCEDC8",
    "#FFF9C4",
    "#FFECB3",
    "#FFE0B2",
    "#FFCCBC",
    "#D7CCC8",
    "#CFD8DC",
  ];

  return (
    <div className={styles.PaletteWrapper}>
      {colors.map((color) => (
        <div
          key={color}
          className={styles.ColorCircle}
          style={{
            backgroundColor: color,
            border:
              color === selectedColor ? "2px solid black" : "1px solid #ccc",
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectColor(color);
          }}
        />
      ))}
    </div>
  );
};

export default PaletteColor;
