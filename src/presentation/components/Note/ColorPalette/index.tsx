import s from './styles.module.scss';

export interface IColorPaletteProps {
  onColorSelect: (color: 'red' | 'yellow' | 'blue' | 'green') => void;
}

const ColorPalette = ({ onColorSelect }: IColorPaletteProps) => {
  const COLORS: Array<'red' | 'yellow' | 'blue' | 'green'> = [
    'red',
    'yellow',
    'blue',
    'green',
  ];

  return (
    <div className={s.color_picker}>
      {COLORS.map((color) => (
        <button
          key={color}
          className={`${s.color} ${s[color]}`}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
