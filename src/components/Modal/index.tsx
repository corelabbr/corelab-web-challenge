import { ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';
import styles from './styles.module.scss';

type modalProps = {
  setOpenModal: (state: boolean) => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ setOpenModal, children, title }: modalProps) => (
  <div className={styles.modalWrapper}>
    <div className={styles.modalContent}>
      <div className={styles.modalHeader}>
        <h1>{title}</h1>

        <button
          type="button"
          className={styles.modalClose}
          onClick={() => setOpenModal(false)}
        >
          <CgClose size={32} />
        </button>
      </div>

      <div className={styles.modalBody}>
        {children}
      </div>
    </div>
  </div>
);
