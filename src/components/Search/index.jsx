import styles from "./Search.module.scss";

const Search = ({ onOpenFilter, search, setSearch, onSearch }) => {
  return (
    <span className={styles.main}>
      <div className={styles.divInput}>
        <button className={styles.buttonFilter} onClick={onSearch}>
          <span className="material-symbols-outlined">search</span>
        </button>
        <input
          type="text"
          placeholder="Pesquisar"
          className={styles.input}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
      </div>
      <button className={styles.buttonFilter} onClick={onOpenFilter}>
        <span className="material-symbols-outlined">tune</span>
      </button>
    </span>
  );
};

export default Search;
