import { useState } from 'react';
import { DeleteIcon, EditColorIcon, EditContentIcon } from '../icons';
import styles from './TaskCard.module.scss';
import ColorsModal from '../ColorsModal';
import { Colors } from '../../types/Colors';

interface TaskCardControlsProps {
  handleColor: (color: Colors) => void;
  handleEdit: () => void;
  handleCardDelete: () => void;
}

function TaskCardControls({
  handleColor,
  handleEdit,
  handleCardDelete,
}: TaskCardControlsProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.Footer}>
        <div className={styles.FooterLeft}>
          <button onClick={() => handleEdit()}>
            <EditContentIcon />
          </button>
          <button onClick={() => setModalOpen((value) => !value)}>
            <EditColorIcon />
          </button>
        </div>
        <button className={styles.delete} onClick={() => handleCardDelete()}>
          <DeleteIcon />
        </button>
        {modalOpen && (
          <div className={styles.Modal}>
            <ColorsModal
              setModalOpen={setModalOpen}
              handleColor={handleColor}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default TaskCardControls;
