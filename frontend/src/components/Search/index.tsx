import { ISearchProps } from "../../types/SearchTypes";

const Search = (props: ISearchProps) => {
  return (
    <input type="text" placeholder={props.placeholder} value={props.value} />
  );
};

export default Search;
