import { SearchIcon } from "lucide-react";
import styles from "./Search.module.scss";
interface Search {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const Search = (props: Search) => {
  return (
    <div className={styles.Search}>
      <SearchIcon size={16} color="#aaa" />
      <input type="text" placeholder={props.placeholder} value={props.value} onChange={(e) => props.setValue(e.target.value)} />
    </div>
  );
};

export default Search;
