import { ChangeEvent } from "react";

import searchIcon from "../../shared/images/search.svg";
import { SearchInputContainer } from "./styles";

interface ISearchInput {
	value: string;
	placeholder: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ onChange, value, placeholder }: ISearchInput) => {
	return (
		<SearchInputContainer>
			<img src={searchIcon} alt="search-icon" />

			<input type="text" placeholder={placeholder} value={value} onChange={onChange} />
		</SearchInputContainer>
	);
};

export default SearchInput;
