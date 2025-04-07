/* eslint-disable prettier/prettier */
import React from 'react';
import { ITodo } from '../../types/TodoTypes';
import { formatDate } from '../../utils/TodoCardUtils';
import '../../styles/TodoCardStyles.scss';
import { useDeleteModal } from '../../utils/useDeleteModal';
import DeleteModal from '../DeleteModal';

interface TodoCardProps {
  todo: ITodo;
  onToggleFavorite: (id: number, isFavorite: boolean) => void;
  onEdit: (todo: ITodo) => void;
  onDelete: (id: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onToggleFavorite, onEdit, onDelete }) => {
  const { id, title, description, isFavorite, color, createdAt } = todo;
  const { isOpen, openModal, closeModal } = useDeleteModal();
  
  const handleDelete = () => {
    onDelete(id);
    closeModal();
  };

  return (
    <>
      <div 
        className="todo-card"
        style={{ '--color': color } as React.CSSProperties}
      >
        <div className="todo-card__header">
          <h3>{title}</h3>
          <button 
            className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
            onClick={() => onToggleFavorite(id, !isFavorite)}
            aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        
        <div className="todo-card__description">
          {description}
        </div>
        
        <div className="todo-card__footer">
          <div className="date">
            {formatDate(createdAt)}
          </div>
          
          <div className="actions">
            <button 
              className="edit-button"
              onClick={() => onEdit(todo)}
              aria-label="Editar tarefa"
            >
              ✏️
            </button>
            <button 
              className="delete-button"
              onClick={openModal}
              aria-label="Excluir tarefa"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        title={title}
        onConfirm={handleDelete}
        onCancel={closeModal}
      />
    </>
  );
};

export default TodoCard; 