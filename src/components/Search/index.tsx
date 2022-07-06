interface ISearch {
  placeholder: string;
  value: string;
  onChange: () => void;
}

const Search = ({ onChange, placeholder, value }: ISearch) => {
  return <input type="text" placeholder={placeholder} value={value} />;
};

export default Search;
