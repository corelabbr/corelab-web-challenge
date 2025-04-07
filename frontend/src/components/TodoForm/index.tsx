import React from 'react';
import { TodoFormProps } from '../../types/TodoFormTypes';
import { useTodoForm, COLORS } from '../../utils/TodoFormUtils';
import '../../styles/TodoFormStyles.scss';

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSave, onCancel }) => {
  const {
    title,
    setTitle,
    description,
    setDescription,
    color,
    setColor,
    isFavorite,
    setIsFavorite,
    handleSubmit
  } = useTodoForm(todo);

  return (
    <form onSubmit={(e) => handleSubmit(e, onSave)}>
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Digite o título da tarefa"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite a descrição da tarefa"
        />
      </div>
      
      <div className="color-selector">
        <label>Cor</label>
        <div className="colors">
          {COLORS.map((c) => (
            <div
              key={c}
              className={`color-option ${color === c ? 'color-option--selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            />
          ))}
        </div>
      </div>
      
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
          {' '}Marcar como favorito
        </label>
      </div>
      
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="save-button">
          Salvar
        </button>
      </div>
    </form>
  );
};

export default TodoForm; 