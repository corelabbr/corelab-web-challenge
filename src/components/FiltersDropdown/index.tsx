import { useTodoStore } from '../../store';
import Button from '../Button';
import { DropdownArrowicon, FavoriteIcon } from '../Icons';
import styles from './Filters.module.scss';
import { COLORS } from '../../lib/colors';
import { useState } from 'react';

const Filters = () => {
  const filterByFavorites = useTodoStore((state) => state.filterByFavorite);
  const filterByColor = useTodoStore((state) => state.filterByColor);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={styles.container} style={{ maxHeight: showFilters ? '100rem' : '2.4rem' }}>
      <div className={styles.header}>
        <span>Filtrar:</span>
        <div className={styles.dropdownToggle} style={{ rotate: showFilters ? '-180deg' : '0deg' }}>
          <Button title="Mostrar/esconder filtros" onClick={() => setShowFilters((prev) => !prev)}>
            <DropdownArrowicon />
          </Button>
        </div>
      </div>
      <div>
        <span>Favoritos:</span>
        <div className={styles.buttonsContainer}>
          <Button title="Filtrar por favoritos" onClick={() => filterByFavorites(true)}>
            <FavoriteIcon isFavorite />
          </Button>
          <Button title="Filtrar por não favoritos" onClick={() => filterByFavorites(false)}>
            <FavoriteIcon />
          </Button>
        </div>
      </div>
      <div>
        <span>Cor:</span>
        <div className={styles.colorsContainer}>
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => filterByColor(color)}
              style={{ backgroundColor: color }}></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
