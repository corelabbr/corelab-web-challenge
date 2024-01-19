import styles from './NavBar.module.scss';
import { useState } from 'react';
import { FilterIcon } from '../icons';
import ColorsModal from '../ColorsModal';
import { Colors } from '../../types/Colors';

interface FilterButtonProps {
  setColor: (color: Colors) => void;
}

function FilterButton({ setColor }: FilterButtonProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleColor = (color: Colors) => {
    setColor(color);
  };

  return (
    <div className={styles.FilterButton}>
      <button
        className={styles.Button}
        onClick={() => setModalOpen((value) => !value)}
      >
        <FilterIcon />
      </button>
      {modalOpen && (
        <ColorsModal setModalOpen={setModalOpen} handleColor={handleColor} />
      )}
    </div>
  );
}

export default FilterButton;
