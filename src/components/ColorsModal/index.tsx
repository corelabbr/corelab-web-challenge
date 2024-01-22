import { Colors } from '../../types/Colors'
import { DeleteIcon } from '../icons'
import styles from './ColorsModal.module.scss'

interface ColorsModalProps {
  handleColor: (color: Colors) => void;
  setModalOpen: (value: boolean) => void;
}

function ColorsModal({ handleColor, setModalOpen }: ColorsModalProps) {
  const values = Object.values(Colors)

  return (
    <div className={styles.Container}>
      {values
        .filter((c) => c !== Colors.Default)
        .map((color) => {
          return (
            <button
              key={color}
              onClick={() => {
                handleColor(color as Colors)
                setModalOpen(false)
              }}
              style={{ backgroundColor: color }}
            ></button>
          )
        })}
      <button
        onClick={() => {
          handleColor(Colors.Default)
          setModalOpen(false)
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  )
}

export default ColorsModal
