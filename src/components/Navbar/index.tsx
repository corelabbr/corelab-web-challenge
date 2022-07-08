import { useContext, useState } from 'react';
import { CgClose, CgMenuRound } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-corelab.png';
import { menuMobileContext } from '../../providers/MenuMobile';
import styles from './styles.module.scss';

export const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const { menuOpen, setMenuOpen } = useContext(menuMobileContext);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener('resize', handleResize);

  return (
    <div className={styles.container}>
      <Link to="/">
        <img src={logo} alt="Logo Corelab" />
      </Link>

      <div className={menuOpen ? styles.mobile : styles.hidden} />

      <div className={menuOpen ? styles.menuOpen : styles.menu}>
        <div className={
          `${width > 480
            ? styles.pages : styles.hidden}
          ${menuOpen ? styles.pages : ''}`
          }
        >
          <Link
            to="/"
            onClick={() => (menuOpen ? setMenuOpen(!menuOpen) : null)}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => (menuOpen ? setMenuOpen(!menuOpen)
              : null)}
          >
            About
          </Link>
        </div>

        <div className={
          `${width > 480 ? styles.right : styles.hidden}
          ${menuOpen ? styles.right : ''}`
          }
        >
          <Link
            to="/login"
            onClick={() => (menuOpen ? setMenuOpen(!menuOpen)
              : null)}
          >
            Login
          </Link>
          <Link
            to="/register"
            onClick={() => (menuOpen ? setMenuOpen(!menuOpen)
              : null)}
          >
            Register
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`${width > 480 ? styles.hidden : styles.menuMobile} `}
        >
          { menuOpen ? <CgClose size={32} /> : <CgMenuRound size={32} /> }
        </button>

      </div>
    </div>
  );
};
