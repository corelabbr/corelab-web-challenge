import styles from './CardModal.module.scss';

interface ColorModalProps {
  cardColor: string;
  onColorPick: (color: string) => void;
}

const ColorModal = ({ onColorPick }: ColorModalProps) => {
  const arr = [
    '#BAE2FF',
    '#B9FFDD',
    '#FFE8AC',
    '#FFCAB9',
    '#F99494',
    '#9DD6FF',
    '#ECA1FF',
    '#DAFF8B',
    '#FFA285',
    '#CDCDCD',
    '#979797',
    '#A99A7C',
  ];

  return (
    <div className={styles.CardModal}>
      {arr.map((color) => (
        <div
          key={color}
          className={styles.Circle}
          style={{ backgroundColor: color }}
          onClick={() => onColorPick(color)}
        ></div>
      ))}
    </div>
  );
};

export default ColorModal;
