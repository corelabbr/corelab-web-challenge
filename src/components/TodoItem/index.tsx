import { useState } from 'react';
import { updateTodo, deleteTodo } from '../../lib/api';
import { Modal } from '../Modal';
import './index.scss';

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  is_favorite: boolean;
  color?: string | null;
  onUpdate: () => void;
}

const COLORS = [
  '#BAE2FF', '#B9FFDD', '#FFE8AC', '#FFCAB9', '#F99494',
  '#9DD6FF', '#ECA1FF', '#DAFF8B', '#FFA285', '#CDCDCD',
  '#979797', '#A99A7C'
];

export const TodoItem = ({ id, title, description, is_favorite, color, onUpdate }: TodoItemProps) => {
  const backgroundColor = color || '#ffffff';
  const borderColor = color ? '#ffffff' : '#D9D9D9';
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [showColors, setShowColors] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      onUpdate();
    } catch (err) {
      console.error("Erro ao deletar TODO:", err);
    }
  };

  const handleFavoriteToggle = async () => {
    await updateTodo(id, { is_favorite: !is_favorite });
    onUpdate();
  };

  const handleEdit = async () => {
    await updateTodo(id, { title: newTitle, description: newDescription });
    setShowEditModal(false);
    onUpdate();
  };

  const handleColorChange = async (newColor: string) => {
    await updateTodo(id, { color: newColor });
    setShowColors(false);
    onUpdate();
  };

  return (
    <div className="todo-item" style={{ backgroundColor }}>
        <div className="todo-item__header" style={{ borderBottom: `1px solid ${borderColor}` }}>
            <strong className="todo-item__title">{title}</strong>
            <button className="todo-item__button" onClick={handleFavoriteToggle}>
                <img src={is_favorite ? '/icons/starred-icon.svg' : '/icons/star-icon.svg'} alt="Favorito" className="todo-item__star-icon" />
            </button>
        </div>

        <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
            <div className="todo-item__edit-form">
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Novo título" />
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Nova descrição" />
                <div className="todo-item__edit-form-buttons">
                    <button className="save" onClick={handleEdit}>Salvar</button>
                    <button className="cancel" onClick={() => setShowEditModal(false)}>Cancelar</button>
                </div>
            </div>
        </Modal>

        <p className="todo-item__description">{description}</p>

        <div className="todo-item__footer">
            <div className="todo-item__left-icons">
                <button className="todo-item__button" onClick={() => setShowEditModal(true)}>
                    <img src="/icons/edit-icon.svg" alt="Editar" className="todo-item-icon" />
                </button>
                <button className="todo-item__button" onClick={() => setShowColors(!showColors)}>
                    <img src="/icons/tint-icon.svg" alt="Mudar cor" className="todo-item-icon" />
                </button>
            </div>
            <button className="todo-item__button" onClick={handleDelete}>
                <img src="/icons/close-icon.svg" alt="Excluir" className="todo-item-icon todo-item-icon__delete" />
            </button>
        </div>
        <Modal isOpen={showColors} onClose={() => setShowColors(false)}>
            <div className="todo-item__color-picker">
                {COLORS.map((c) => (
                    <div
                        key={c}
                        className="todo-item__color-picker-dot"
                        style={{ backgroundColor: c }}
                        onClick={() => handleColorChange(c)}
                    />
                ))}
            </div>
        </Modal>
    </div>
  );
};
