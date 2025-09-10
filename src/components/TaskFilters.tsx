import { useState, useEffect } from "react";
import { PRIORITY_OPTIONS, PRIORITY_MAP } from "../constants/priorities";

interface TaskFiltersProps {
  onFilter: (filters: { favorite?: boolean; color?: number }) => void;
  onClear: () => void;
  currentFilters?: { favorite?: boolean; color?: number };
}

function TaskFilters({
  onFilter,
  onClear,
  currentFilters = {},
}: TaskFiltersProps) {
  const [favoriteFilter, setFavoriteFilter] = useState<string>(
    currentFilters.favorite !== undefined
      ? currentFilters.favorite.toString()
      : "all"
  );

  const [priorityFilter, setPriorityFilter] = useState<string>(
    currentFilters.color !== undefined ? currentFilters.color.toString() : "all"
  );

  useEffect(() => {
    setFavoriteFilter(
      currentFilters.favorite !== undefined
        ? currentFilters.favorite.toString()
        : "all"
    );
    setPriorityFilter(
      currentFilters.color !== undefined
        ? currentFilters.color.toString()
        : "all"
    );
  }, [currentFilters]);

  const getFavoriteLabel = (value: string) => {
    switch (value) {
      case "true":
        return "Apenas favoritos";
      case "false":
        return "Não favoritos";
      default:
        return "Todos";
    }
  };

  const getPriorityLabel = (value: string) => {
    if (value === "all") return "Todas";
    const priority = PRIORITY_MAP[parseInt(value)];
    return priority ? priority.label : "Todas";
  };

  const handleApplyFilters = () => {
    const filters: { favorite?: boolean; color?: number } = {};

    if (favoriteFilter !== "all") {
      filters.favorite = favoriteFilter === "true";
    }

    if (priorityFilter !== "all") {
      const colorValue = parseInt(priorityFilter);

      if (!isNaN(colorValue) && colorValue >= 0 && colorValue <= 5) {
        filters.color = colorValue;
      }
    }

    onFilter(filters);
  };

  const handleClearFilters = () => {
    setFavoriteFilter("all");
    setPriorityFilter("all");
    onClear();
  };

  return (
    <div className="task-filters" role="region" aria-label="Filtros de tarefas">
      <div className="filters-header">
        <h3>Filtrar Tarefas</h3>
      </div>

      <div className="filters-row">
        {/* Filtro de Favoritos */}
        <div className="filter-group">
          <label htmlFor="favorite-filter">Favoritos:</label>
          <div className="filter-with-preview">
            <select
              id="favorite-filter"
              value={favoriteFilter}
              onChange={(e) => setFavoriteFilter(e.target.value)}
              className="filter-select"
              aria-describedby="favorite-preview"
            >
              <option value="all">Todos</option>
              <option value="true">Apenas favoritos</option>
              <option value="false">Não favoritos</option>
            </select>
            <div id="favorite-preview" className="filter-preview">
              {getFavoriteLabel(favoriteFilter)}
            </div>
          </div>
        </div>

        {/* Filtro de Prioridade */}
        <div className="filter-group">
          <label htmlFor="priority-filter">Prioridade:</label>
          <div className="filter-with-preview">
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
              aria-describedby="priority-preview"
            >
              <option value="all">Todas</option>
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div
              id="priority-preview"
              className="filter-preview"
              data-priority={priorityFilter}
            >
              {getPriorityLabel(priorityFilter)}
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="filter-actions">
          <button
            onClick={handleApplyFilters}
            className="filter-btn apply-btn"
            aria-label="Aplicar filtros"
          >
            Aplicar
          </button>
          <button
            onClick={handleClearFilters}
            className="filter-btn clear-btn"
            aria-label="Limpar filtros"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
