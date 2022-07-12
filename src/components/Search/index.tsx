import styles from "./Search.module.scss";
import { IoSearch } from "react-icons/io5";
import React, { ReactNode } from "react";

interface ISearch {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  toolsComponent?: ReactNode
}

const Search: React.FC<ISearch> = ({ toolsComponent, ...props}) => {
  return (
    <div className={styles.search}>
      <button onClick={props.onSearch} type="button" aria-label="Search" role="button" >
        <svg width={20} height={20} className="DocSearch-Search-Icon" >
          <path
            d="m14.386 14.386 4.088 4.088-4.088-4.088A7.533 7.533 0 1 1 3.733 3.733a7.533 7.533 0 0 1 10.653 10.653z"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <input type="text" placeholder={props.placeholder} value={props.value} onChange={e => props.onChangeText?.(e.target.value)} />
     {!!toolsComponent && <div className={styles.tools}>
        {toolsComponent}
      </div>}
    </div>
  );
};

export default Search;
