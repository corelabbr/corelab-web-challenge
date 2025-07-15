// src/components/Search/index.tsx

import React from "react";
import styles from "./Search.module.scss";

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ placeholder, value, onChange }: ISearch) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      className={styles.inputSearch}
      onChange={onChange}
    />
  );
};

export default Search;
