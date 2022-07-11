import { useContext, useState } from 'react';
import { CgClose, CgLogOut, CgMenuRound } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo-corelab.png';
import { menuMobileContext } from '../../providers/MenuMobile';
import { UserContext } from '../../providers/UserAuthenticate';
import styles from './styles.module.scss';

export const Navbar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const { user, logOut } = useContext(UserContext);
  const { menuOpen, setMenuOpen } = useContext(menuMobileContext);

  const handleResize = () => {
    setWidth(window.innerWidth);
    if (window.innerWidth > 480) {
      setMenuOpen(false);
    }
  };
  window.addEventListener('resize', handleResize);

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className={styles.container}>
      <Link
        to="/"
        onClick={window.location.reload}
      >
        <img
          src={logo}
          alt="Logo Corelab"
        />
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
        {!(user.username) && (

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
        )}

        {user.username && (
          <div className={
            `${width > 480 ? styles.right : styles.hidden}
            ${menuOpen ? styles.right : ''}`
          }
          >
            <Link
              to="/my-vehicles"
              onClick={() => (menuOpen ? setMenuOpen(!menuOpen)
                : null)}
            >
              My Vehicles
            </Link>

            <button
              type="button"
              className={styles.btnLogout}
              onClick={handleLogout}
            >
              <span>
                Logout
                <CgLogOut size={16} />
              </span>
            </button>

          </div>
        )}

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
