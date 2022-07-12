import styles from './Search.module.scss'
import SearchIcon from '../../icons/Search.png'

interface ISearch {
  placeholder: string;
  value: string;
  onChange: () => void;
}

const Search = (props: ISearch) => {
  return ( 
    <div className={styles.Container}>
      <div className={styles.Wrap}>
        <img className={styles.Img} src={SearchIcon}/>
        <input className={styles.Input} type="text" placeholder={props.placeholder} value={props.value} />
      </div>
    </div>
  );
};

export default Search;
