import { useState } from 'react';
import { SearchIcon } from '../Icons';
import styles from './Search.module.scss';
import { useTodoStore } from '../../store';

const Search = () => {
  const [searchInput, setSearchInput] = useState('');
  const filterTodos = useTodoStore((state) => state.filterBySearch);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    filterTodos(searchInput);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Pesquisar notas"
        value={searchInput}
        onChange={handleChange}
      />
      <SearchIcon />
    </form>
  );
};

export default Search;
