import IconButton from "../IconButton";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Search.module.scss";

interface ISearch {
  value: string;
  setValue: (value: string) => void;
  onChange: () => void;
}

const Search = (props: ISearch) => {
  return (
    <div className={styles.Search}>
      <input
        type="text"
        placeholder="Pesquisar notas"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
      />
      <IconButton
        Icon={AiOutlineSearch}
        onClick={props.onChange}
        color="#9e9e9e"
      />
    </div>
  );
};

export default Search;
