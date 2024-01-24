import { ReactComponent as Close } from "../../assets/img/Vector.svg";
import { ReactComponent as Searchicon } from "../../assets/img/search.svg";
import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import Search from "../Search";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <div className={styles.Header}>
        <div className={styles.conteiner}>
          <img
            src={require("../../assets/img/image8.png")}
            alt=""
            className={styles.ima}
          />
          <span className={styles.title}>CoreNotes </span>
          <div className={styles.searchconteiner}>
            <Search
              placeholder="Pesquisar notas"
              value={search}
              onChange={(value) => {
                setSearch(value.target.value);
              }}
              className={styles.search}
            />
            <Searchicon></Searchicon>
          </div>
        </div>

        <Close></Close>
      </div>
    </>
  );
};

export default Header;
