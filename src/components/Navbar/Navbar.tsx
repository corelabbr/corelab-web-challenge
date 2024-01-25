import Image from 'next/image';
import { NavbarLinks } from './NavbarLinks';
import { NavbarSearch } from './NavbarSearch';
import styles from './styles.module.scss';

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <Image
          src="/logo.png"
          alt="CoreNotes logo"
          width={40} height={40}
        />
        <span>CoreNotes</span>
        <NavbarSearch />
      </div>
      <NavbarLinks/>
    </nav>
  )
}