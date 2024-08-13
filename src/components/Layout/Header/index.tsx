import styles from './Header.module.scss'
import Nav from './Nav'

export default function Header() {
  return (
    <header className={styles.header}>
      <Nav />
    </header>
  )
}
