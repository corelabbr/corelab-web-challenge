import { useTodoStore } from '../../store';
import styles from './ColorPallete.module.scss';
import { COLORS } from '../../lib/colors';

interface iCollorPallete {
  id: number;
}

const ColorPallete = ({ id }: iCollorPallete) => {
  const changeColor = useTodoStore((state) => state.changeColor);

  const selectColor = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, color: string) => {
    e.stopPropagation();
    changeColor(id, color);
  };

  return (
    <>
      <div className={styles.pallete}>
        {COLORS.map((color) => (
          <button
            key={color}
            onClick={(e) => selectColor(e, color)}
            style={{ backgroundColor: color }}></button>
        ))}
      </div>
    </>
  );
};

export default ColorPallete;
