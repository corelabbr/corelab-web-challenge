import styles from "./Card.module.scss";
import Modal from "../Modal";

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangeColor: (color: string) => void;
}

const colors = [
  "#BAE2FF",
  "#B9FFDD",
  "#FFE8AC",
  "#FFCAB9",
  "#F99494",
  "#9DD6FF",
  "#ECA1FF",
  "#DAFF8B",
  "#FFA285",
  "#CDCDCD",
  "#979797",
  "#A99A7C",
];

const ColorPickerModal = ({
  isOpen,
  onClose,
  onChangeColor,
}: ColorPickerModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.colors}>
        {colors.map((color) => (
          <div
            key={color}
            className={styles.color}
            style={{ backgroundColor: color }}
            onClick={() => onChangeColor(color)}
          />
        ))}
      </div>
    </Modal>
  );
};

export default ColorPickerModal;
