import { CiSearch } from 'react-icons/ci';
import styles from './Search.module.scss';

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: ISearch) => {
  return (
    <div className={styles.SearchBar}>
      <input type="text" placeholder={props.placeholder} value={props.value} onChange={props.onChange} />
      <CiSearch className={styles.SearchIcon} />
    </div>
  );
};

export default Search;
