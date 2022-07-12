import {useState } from "react";


interface ISearch {
  onSearch(query:string):Promise<void>;
  placeholder: string;
  className?: string
}

const Search = (props:ISearch) => {
  
  const [query, setQuery] = useState<string>("");

  return (
    <form action="#" onChange={() => props.onSearch(query)}  >
          <input type="text" 
          placeholder={props.placeholder}
          value={query}  
          onChange={(e) => setQuery(e.target.value)}
          className={props.className}
          />
    </form>
    
  );
};

export default Search;
