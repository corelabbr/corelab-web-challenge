/* eslint-disable prettier/prettier */
import React from 'react';
import { COLORS } from '../../utils/TodoFormUtils';
import '../../styles/TodoFiltersStyles.scss';

interface TodoFiltersProps {
  selectedColor: string | null;
  showOnlyFavorites: boolean;
  onColorSelect: (color: string | null) => void;
  onFavoriteToggle: (showOnlyFavorites: boolean) => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({
  selectedColor,
  showOnlyFavorites,
  onColorSelect,
  onFavoriteToggle,
}) => {
  return (
    <div className="todo-filters">
      <h2>Filtros</h2>
      
      <div className="filter-section">
        <h3>Cores</h3>
        <div className="color-filters">
          <div
            className={`color-option ${selectedColor === null ? 'color-option--selected' : ''}`}
            style={{ background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' }}
            onClick={() => onColorSelect(null)}
            title="Todas as cores"
          />
          {COLORS.map((color) => (
            <div
              key={color}
              className={`color-option ${selectedColor === color ? 'color-option--selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onColorSelect(color)}
              title={color}
            />
          ))}
        </div>
      </div>
      
      <div className="filter-section">
        <h3>Favoritos</h3>
        <div className="favorite-filter">
          <input
            type="checkbox"
            id="show-favorites"
            checked={showOnlyFavorites}
            onChange={(e) => onFavoriteToggle(e.target.checked)}
          />
          <label htmlFor="show-favorites">Mostrar apenas favoritos</label>
        </div>
      </div>
    </div>
  );
};

export default TodoFilters; 