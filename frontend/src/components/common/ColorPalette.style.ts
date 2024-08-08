import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ShadesProps {
  $color: string
}

interface ActivateProps {
  $activate?: boolean
}

export const IconContainer = styled.div`
  position: relative;
`;

export const Icon = styled(FontAwesomeIcon)<ActivateProps>`
  height: 14px;
  width: 14px;
  color: #51646E;
  padding: 6px;
  cursor: pointer;
  background-color: ${({$activate}) => $activate ? "#FAA000" : "transparent"};
  border-radius: 100%;
`;

export const Palette = styled.div<ActivateProps>`
  display: ${({$activate}) => $activate ? "flex" : "none"};
  width: 440px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -40px;
  left: -50px;
  padding: 5px 10px;
  gap: 5px;
  background-color: #fff;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 260px;
    flex-wrap: wrap;
    bottom: -80px;
  }
`;

export const Shades = styled.div<ShadesProps>`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  background-color: ${({$color}) => $color};
  cursor: pointer;
`;