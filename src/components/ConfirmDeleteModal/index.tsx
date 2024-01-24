import { useTodoStore } from '../../store';
import styles from './ConfirmDeleteModal.module.scss';

interface IConfirmDeleteModal {
  id: number;
  closeModal: () => void;
}

const ConfirmDeleteModal = ({ id, closeModal }: IConfirmDeleteModal) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const onDelete = () => {
    deleteTodo(id);
    closeModal();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <p>
          Esta nota será apagada <b>PERMANENTEMENTE</b>
        </p>
        <p>Tem certeza que deseja continuar?</p>
        <footer>
          <button className={styles.cancel} onClick={closeModal}>
            Cancelar
          </button>
          <button className={styles.delete} onClick={onDelete}>
            Deletar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
