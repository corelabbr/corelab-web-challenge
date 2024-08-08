import SearchInput from "../common/SearchInput";
import { Icon } from "../common/SearchInput.style";
import { Container, LogoContainer, LogoImage, LogoName, LogoSearchContainer } from "./Nav.style";

import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface NavProps {
  updateData: (value: string) => void
}

export default function Nav({updateData}: NavProps){
  return (
    <Container>
      <LogoSearchContainer>
        <LogoContainer>
          <LogoImage src="/images/logo.png"/>
          <LogoName>CoreNotes</LogoName>
        </LogoContainer>
        <SearchInput updateData={(value: string) => updateData(value)} />
      </LogoSearchContainer>
      <Icon icon={faXmark} />
    </Container>
  )
}