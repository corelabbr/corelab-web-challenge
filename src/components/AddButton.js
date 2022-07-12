import styled from "styled-components";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";

export default function AddButton({ setIsHidden }) {
  return (
    <StyledButton onClick={() => setIsHidden(false)}>
      <StyledIcon size={"large"} icon={addOutline}/>
      Adicionar
    </StyledButton>
  );
}

const StyledIcon = styled(IonIcon)`
  position: absolute;
  left: 20px
`;

const StyledButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  cursor: pointer;
  background-color: aquamarine;
  border-radius: 25px;
  border: none;
  font-size: 20px;
  text-transform: uppercase;
`;