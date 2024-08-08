import { useState } from "react";
import { Icon, SearchButton, SearchForm, SInput } from "./SearchInput.style";
import { MouseEvent, KeyboardEvent  } from "react";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface SearchProps {
  updateData: (name: string) => void
}

export default function SearchInput({updateData}: SearchProps){
  const [value, setValue] = useState<string>("");

  function handleValue(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSearch(event: MouseEvent<SVGSVGElement>) {
    event.preventDefault();
    updateData(value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      updateData(value);
    }
  }

  return (
    <SearchForm>
      <SInput 
        type="text" 
        name="search" 
        placeholder="Pesquisar notas" 
        onChange={handleValue} 
        value={value}
        onKeyDown={handleKeyDown}
      />
      <SearchButton>
        <Icon icon={faMagnifyingGlass} onClick={handleSearch} />
      </SearchButton>
    </SearchForm>
  )
}