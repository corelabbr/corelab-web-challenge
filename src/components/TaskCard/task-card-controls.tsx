import { useState } from 'react';
import { DeleteIcon, EditColorIcon, EditContentIcon } from '../icons';
import styles from './TaskCard.module.scss';
import ColorsModal from '../ColorsModal';
import { Colors } from '../../types/Colors';

interface TaskCardControlsProps {
  handleColor: (color: Colors | undefined) => void;
}

function TaskCardControls({ handleColor }: TaskCardControlsProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.Footer}>
        <div className={styles.FooterLeft}>
          <button>
            <EditContentIcon />
          </button>
          <button onClick={() => setModalOpen((value) => !value)}>
            <EditColorIcon />
          </button>
        </div>
        <button className={styles.delete}>
          <DeleteIcon />
        </button>
      </div>
      {modalOpen &&
      <div className={styles.Modal}>
       <ColorsModal handleColor={handleColor} />
      </div>
      }
    </>
  );
}

export default TaskCardControls;
