import { AllColorsIcon } from '../Icons';
import styles from './ColorPicker.module.scss';
import { Color } from '../../constants/colors';

interface ColorPickerProps {
  colors: Color[];
  selectedColor: string;
  onSelect: (color: Color) => void;
  type?: 'note' | 'filter';
}

export const ColorPicker = ({ colors, selectedColor, onSelect, type = 'note' }: ColorPickerProps) => {
  return (
    <div className={type === "filter" ? styles.filter : styles.ColorPicker}>
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onSelect(color)}
          className={selectedColor === color.id ? styles.active : ''}
          style={color.id === '' ? {} : { backgroundColor: color.hex }}
          title={color.name}
        >
          {color.id === '' && type === 'filter' && <AllColorsIcon />}
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;