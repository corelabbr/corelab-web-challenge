import { useFilter } from '../../hooks/useFilter'
import SearchInput from '../SearchInput'
import styles from './NavBar.module.scss'
import logo from '../../assets/core-notes-logo.svg'
import FilterButton from './filter-button'

const NavBar = () => {
  const { setColor, setSearch, search } = useFilter()

  return (
    <nav className={styles.Container}>
      <div className={styles.NavLeft}>
        <div className={styles.Logo}>
          <img src={logo} alt="Core Notes Logotipo" />
          <h1>Core Notes</h1>
        </div>
        <SearchInput value={search} handleChange={setSearch} />
      </div>
      <div className={styles.NavRight}>
        <FilterButton setColor={setColor} />
      </div>
    </nav>
  )
}

export default NavBar
