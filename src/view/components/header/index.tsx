import { SearchInput } from './search-input'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Core notes</h1>
      <SearchInput />
    </header>
  )
}
