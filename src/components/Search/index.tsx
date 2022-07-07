import React from "react";

import styles from './Search.module.scss'
import { Filter } from '../index'

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
}


const Search = (props: ISearch) => {
  return (
    <div className={styles.Search}>
        <input type="text" placeholder={props.placeholder} onChange={props.onChange} />
        <Filter onClick={()=> console.log('Filter')} />
    </div>
  );
};

export default Search;
