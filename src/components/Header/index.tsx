import styles from "./Header.module.scss"
import Search from "../Search";
import logo from "../../assets/logo.png"
import close from "../../assets/close.png"
import { IoIosMenu } from "react-icons/io";
import { useState } from "react";


interface IHeader {
  value: string;
  fetchSearchedTasks: (filter: { title: string }) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = (props: IHeader) => {
  const [toggleMenuHeader, setToggleMenuHeader] = useState(true);

  const handlerToggleMenu = () => {

    setToggleMenuHeader(!toggleMenuHeader);

  }
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e);
    props.fetchSearchedTasks({ title: e.target.value });
  }

  return (
    <>
      {toggleMenuHeader ?
        <header className={styles.HeaderPrincipal}>

          <div className={styles.Header}>
            <div className={styles.headerLogo}>
              <img
                src={logo}
                alt="Descrição da Imagem"
                style={{ width: '2.269rem', height: '2.269rem' }}
              />
            </div>
            <div className={styles.headerParagraph}>
              <p>CoreNotes</p>
            </div>
            <div className={styles.headerSearch}>
              <Search placeholder="Pesquisar notas" value={props.value} onChange={handleSearch} />
            </div>
          </div>

          <div className={styles.headerX}>
            <img
              src={close}
              alt="Descrição da Imagem"
              className={styles.closeCard}
              onClick={handlerToggleMenu}
            />

          </div>

        </header>

        :

        <div className={styles.containerHambuguerMenu}>
          <IoIosMenu className={styles.burguermenu} onClick={handlerToggleMenu}></IoIosMenu>

        </div>

      }
    </>


  );
};

export default Header;
