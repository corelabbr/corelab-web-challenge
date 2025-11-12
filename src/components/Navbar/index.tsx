import { ReactComponent as SearchIcon } from "../../assets/imgs/search.svg";
import { ReactComponent as RemoveIcon } from "../../assets/imgs/remove.svg";
import styles from "./Navbar.module.scss";
import COLORS from "../../constants/colors";
import { useAuth } from "../../providers/AuthProvider";

interface NavbarProps {
  search: string;
  setSearch: (search: string) => void;
  colorFilter: string[];
  setColorFilter: React.Dispatch<React.SetStateAction<string[]>>;
}

const Navbar = (props: NavbarProps) => {
  const { search, setSearch, colorFilter, setColorFilter } = props;

  const { logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.navbarContentSearchFilter}>
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <img
              src="/navbar-icon.png"
              alt="CoreNotes Icon"
              width="36px"
              height="36px"
            />
            <p>CoreNotes</p>
          </div>

          <div className={styles.searchContainer}>
            <input
              className={styles.search}
              placeholder="Pesquisar notas"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>
        </div>

        <div className={styles.navbarContentColorFilter}>
          <div className={styles.colorFilterBar}>
            {COLORS.map((color) => {
              const selected = colorFilter.includes(color);
              return (
                <button
                  key={color}
                  className={`${styles.colorFilterCircle} ${
                    selected ? styles.selected : ""
                  }`}
                  style={{ background: color }}
                  onClick={() =>
                    setColorFilter(
                      selected
                        ? colorFilter.filter((c) => c !== color)
                        : [...colorFilter, color]
                    )
                  }
                  aria-label={`Filtrar por cor ${color}`}
                  type="button"
                />
              );
            })}
            {colorFilter.length > 0 && (
              <button
                className={styles.clearFilter}
                onClick={() => setColorFilter([])}
                type="button"
              >
                Limpar
              </button>
            )}
          </div>
          <button className="btn-text" type="button" onClick={logout}>
            <RemoveIcon className={styles.options} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
