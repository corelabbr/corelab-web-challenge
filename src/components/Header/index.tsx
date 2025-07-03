import { MagnifyingGlass, X } from "phosphor-react";
import logo from "../../assets/logo.svg";
import { HeaderContainer, HeaderContent, LogoContainer, SearchContainer, ButtonClose } from "./style";
import { useNote } from "@/contexts/useNote";

export function Header() {
  const { searchText, setSearchText } = useNote();

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <img src={logo} />
          <h1>CoreNotes</h1>
        </LogoContainer>

        <SearchContainer>
          <input
            type="text"
            placeholder="pesquisar notas"
            value={searchText}
            onChange={handleSearchInput}
          />

          <MagnifyingGlass size={12} />
        </SearchContainer>
      </HeaderContent>

      <ButtonClose>
        <X size={14} />
      </ButtonClose>
    </HeaderContainer>
  );
}
