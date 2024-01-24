import styles from './Header.module.scss';
import NotesIcon from '../../assets/notes.png';
import Search from '../Search';
import XIcon from '../Icons/XIcon';
import Button from '../Button';
import { useTodoStore } from '../../store';

const Header = () => {
  const resetFilters = useTodoStore((state) => state.resetFilters);

  return (
    <header className={styles.Header}>
      <img src={NotesIcon} alt="Two yellow notes holded by a pin on the top" />
      <span className={styles.CoreNotes}>CoreNotes</span>
      <Search />
      <div>
        <Button title="Limpar filtros" onClick={resetFilters}>
          <XIcon />
        </Button>
      </div>
    </header>
  );
};

export default Header;
