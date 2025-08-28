import React from "react";
import styles from "./Filters.module.scss";
import type { TaskColor } from "../../types/Task";

const COLORS: TaskColor[] = ["yellow", "blue", "green", "peach"];
type Props = {
  search: string;
  onSearchChange: (v: string) => void;
  favoriteOnly: boolean;
  onFavoriteToggle: () => void;
  color?: TaskColor | "";
  onColorChange: (c: TaskColor | "") => void;
};

export default function Filters({
  search,
  onSearchChange,
  favoriteOnly,
  onFavoriteToggle,
  color,
  onColorChange,
}: Props) {
  return (
    <div className={styles.filters}>
      <div className={styles.left}>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por título/descrição..."
          className={styles.searchInput}
        />
      </div>
      <div className={styles.right}>
        <button
          className={`${styles.favBtn} ${favoriteOnly ? styles.active : ""}`}
          onClick={onFavoriteToggle}
          aria-pressed={favoriteOnly}
          title="Mostrar apenas favoritos"
        >
          ★ Favoritos
        </button>

        <div className={styles.colors}>
          <button
            className={`${styles.color} ${!color ? styles.active : ""}`}
            onClick={() => onColorChange("")}
            title="Todas as cores"
          >
            Todas
          </button>
          {COLORS.map((c) => (
            <button
              key={c}
              className={`${styles.color} ${styles[c]} ${
                color === c ? styles.active : ""
              }`}
              onClick={() => onColorChange(c)}
              title={`Cor: ${c}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
