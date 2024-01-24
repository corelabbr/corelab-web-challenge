interface ISearch {
  placeholder: string;
  value: string;
  className: string;
  onChange: (value: any) => void;
}

const Search = (props: ISearch) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      className={props.className}
      onChange={props.onChange}
    />
  );
};

export default Search;
