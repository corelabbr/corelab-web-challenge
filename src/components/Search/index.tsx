import { SearchIcon } from '../Icons';
import styles from './Search.module.scss';

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const Search = ({ placeholder, value, onChange, className }: SearchProps) => {
  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.searchIcon}>
        <SearchIcon />
      </div>
    </div>
  );
};
