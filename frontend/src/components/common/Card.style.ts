import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
  $iconColor: string
}

interface ColorProps {
  $color: string
}

interface ActivateProps {
  $activate?: boolean
}

export const Container = styled.div<ColorProps>`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 440px;
  border-radius: 12px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
  background-color: ${({$color}) => $color};
`; 

export const TitleContainer = styled.div<ColorProps>`
  display: flex;
  flex-direction: row;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  border-bottom: 1px solid ${({$color}) => $color === "#FFFFFF" ? "#D9D9D9" : "#FFFFFF"};
`;

// d9d9d9

export const TitleInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 14x;
  font-weight: bold;
  border: none;
  outline: none;
  background-color: transparent;
`;

export const ContentInput = styled.textarea`
  width: 100%;
  max-width: 360px;
  min-width: 360px;
  height: 100%;
  min-height: 345px;
  max-height: 345px;
  font-size: 14px;
  border: none;
  outline: none;
  overflow: auto;
  padding: 16px 0px;
  background-color: transparent;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

export const ContentContainer = styled.div`
  flex: 1;
  padding: 0px 20px;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 44px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
`;

export const Icons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Icon = styled(FontAwesomeIcon)`
  height: 14px;
  width: 14px;
  color: #51646E;
  padding: 6px;
  cursor: pointer;
`;

export const EditIcon = styled(FontAwesomeIcon)<ActivateProps>`
  height: 14px;
  width: 14px;
  color: #51646E;
  border-radius: 100%;
  background-color: ${({$activate}) => $activate ? "#FAA000" : "transparent"};
  padding: 6px;
  cursor: pointer;
`;

export const FavoriteIcon = styled(FontAwesomeIcon)<IconProps>`
  height: 14px;
  width: 14px;
  cursor: pointer;
  color: ${({ $iconColor }) => $iconColor};
`;


