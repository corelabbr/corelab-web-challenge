import React from 'react';
import styles from './ConfirmationLightbox.module.scss';

interface IConfirmationLightboxProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationLightbox: React.FC<IConfirmationLightboxProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.lightboxOverlay}>
      <div className={styles.lightboxContent}>
        <h3>Confirmar Ação</h3>
        <p>{message}</p>
        <div className={styles.lightboxActions}>
          <button onClick={onCancel} className={styles.btnSecondary}>
            Cancelar
          </button>
          <button onClick={onConfirm} className={styles.btnDanger}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationLightbox;
