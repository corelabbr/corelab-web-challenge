import React from "react";
import styles from "./Header.module.scss";
import { Search as SearchIcon } from "lucide-react";

// Props do Header
interface IHeaderProps {
  placeholder: string; // Texto do placeholder do input
  value: string; // Valor atual do input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback ao digitar
}

const Header: React.FC<IHeaderProps> = ({ placeholder, value, onChange }) => {
  return (
    <header className={styles.Header}>
      {/* Título da aplicação */}
      <h1>Core Notes</h1>

      {/* Container do input de pesquisa */}
      <div className={styles.SearchContainer}>
        {/* Ícone de lupa */}
        <div className={styles.IconWrapper}>
          <SearchIcon size={15} color="lightgrey" />
        </div>

        {/* Input de pesquisa */}
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange} // ✅ dispara callback direto
          className={styles.SearchInput}
        />
      </div>
    </header>
  );
};

export default Header;
