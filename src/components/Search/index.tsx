import styles from "./Search.module.scss";

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const Search = (props: ISearch) => {
  return <input type='text' className={styles.Search} placeholder={props.placeholder} value={props.value} />;
};

export default Search;
