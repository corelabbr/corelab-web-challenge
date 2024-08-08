import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
  $iconColor: string;
}

export const Container = styled.form`
  width: 100%;
  max-width: 520px;
  min-height: 100px;
  border: 1px solid #DCDCDC;
  border-radius: 6px;
  padding: 1px;
  padding-top: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
  margin-bottom: 40px;
`;

export const Line = styled.hr`
  border-top: 1px solid #DCDCDC;
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  margin-bottom: 10px;
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
`;

export const ContentInput = styled.textarea`
  width: 100%;
  max-width: 510px;
  min-width: 510px;
  min-height: 50px;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  outline: none;

  @media (max-width: 768px) {
    max-width: 100%;
    min-width: 100%;
  }
`;

export const Icon = styled(FontAwesomeIcon)<IconProps>`
  height: 16px;
  width: 16px;
  cursor: pointer;
  color: ${({ $iconColor }) => $iconColor};
`;

export const NoteBotton = styled.input.attrs({ type: "submit" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  border: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: #FFA000;
  outline: none;
  cursor: pointer;
`;