import styles from "../../styles/Search.module.scss";
import filterIcon from "../../filter.svg";
import { useState } from "react";
import FilterVehicle from "../FilterVehicle";
interface ISearch {
  placeholder: string;
  value: string;
  setSearch: (search: string) => void;
}

const Search = (props: ISearch) => {
  const [model, setModel] = useState<boolean>(false);

  return (
    <div className={styles.SearchContainer}>
      <input
        className={styles.InputSeach}
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setSearch(e.target.value)}
      ></input>
      <img
        className={styles.Input_icon}
        src={filterIcon}
        alt="filter icon"
        onClick={() => setModel(true)}
      />
      {model && <FilterVehicle setModel={setModel} />}
    </div>
  );
};

export default Search;
