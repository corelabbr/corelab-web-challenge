import Search from "../Search";
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.Header}>
            <section className={styles.HeaderLogo}>
                <img alt="logo" src="logo-note.png" />
                <span>CoreNotes</span>
            </section>
            <section className={styles.HeaderSearch}>
                <Search placeholder="Pesquisar notas" />
            </section>
        </header>
    );
};

export default Header;
