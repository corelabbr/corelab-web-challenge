import { IonIcon } from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import styled from "styled-components";

export default function SearchBar() {
  return (
    <InputContainer>
      <IconContainer>
        <IonIcon size={"large"} icon={searchOutline} />
        <StyledInput placeholder="Buscar" />
      </IconContainer>
    </InputContainer>
  );
}

const StyledInput = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  width: 100%;
  background-color: transparent;
  border: none;
  :focus-visible{
    border: none;
    outline: none;
  }
`;


const InputContainer = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: lightblue;
  border-radius: 25px;
  margin-right: 15px;
`;

const IconContainer = styled.div`
  display: flex;
  position: absolute;

`;

