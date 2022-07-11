import styles from "./Search.module.scss";
import { OptionsOutline } from "react-ionicons"

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  onClickFilter: (e: any) => void;
}

const Search = (props: ISearch) => {
  const inlineStyle = {
    cursor: "pointer"
  }
  return (
   
    <div className={styles.Search}>
      <input onChange={props.onChange} type="text" placeholder={props.placeholder} value={props.value} />
      <OptionsOutline
      color={'#00000'} 
      title={""}
      height="50px"
      width="50px"
      onClick={props.onClickFilter}
      style={inlineStyle}></OptionsOutline>
    </div>
    
  );
};

export default Search;
