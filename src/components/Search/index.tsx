import styles from "./Search.module.scss";

interface ISearch {
  placeholder: string;
  value: string;
  // TODO: change to onChange: (e: any) => void;
  onChange: any;
}

const Search = (props: ISearch) => {
  return <input type='text' className={styles.Search} placeholder={props.placeholder} value={props.value} />;
};

export default Search;
