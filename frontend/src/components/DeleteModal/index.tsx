/* eslint-disable prettier/prettier */
import React from 'react';

import '../../styles/DeleteModalStyles.scss';
import { DeleteModalProps } from '../../types/DeleteModalTypes';

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, title, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmar exclusão</h2>
        <p>Tem certeza que deseja excluir a tarefa &ldquo;{title}&rdquo;?</p>
        <div className="modal-actions">
          <button className="cancel-button" onClick={onCancel}>
            Cancelar
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
