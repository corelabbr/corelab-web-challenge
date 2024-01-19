import { Colors } from '../../types/Colors';
import { DeleteIcon } from '../icons';
import styles from './ColorsModal.module.scss';

interface ColorsModalProps {
  handleColor: (color: Colors | undefined ) => void;
}

function ColorsModal({ handleColor }: ColorsModalProps) {

  const values = Object.values(Colors);

  return (
    <div className={styles.Container}>
      {values.map((color) => {
        return <button key={color} onClick={() => handleColor(color as Colors)} style={{ backgroundColor: color }}></button>
      })}
      <button onClick={() => handleColor(undefined)}><DeleteIcon /></button>
    </div>
  )
}

export default ColorsModal;
