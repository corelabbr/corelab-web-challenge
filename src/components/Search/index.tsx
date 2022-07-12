import { ChangeEvent } from 'react';
import { CgSearch } from 'react-icons/cg';
import styles from './styles.module.scss';

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onChange, placeholder, value }: ISearch) => (
  <label htmlFor="search" className={styles.container}>
    <CgSearch size={24} className={`${styles.clickable} ${styles.pdLeft}`} />

    <input
      id="search"
      className={styles.input}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e)}
    />
  </label>
);

export default Search;
