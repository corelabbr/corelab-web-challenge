import React from "react";

import styles from './Search.module.scss'


interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
}


const Search = (props: ISearch) => {
  return (
    <div className={styles.Search}>
        <input type="text" placeholder={props.placeholder} onChange={props.onChange} />
    </div>
  );
};

export default Search;
