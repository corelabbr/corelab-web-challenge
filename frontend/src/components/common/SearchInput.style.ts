import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  border: 1px solid #DCDCDC;
  border-radius: 6px;
  padding: 0px 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SInput = styled.input`
  font-size: 12px;
  width: 100%;
  border: none;
  outline: none;
  min-width: 120px;
  background-color: transparent;
`;

export const SearchButton = styled.button.attrs({ type: "submit" })`
  height: fit-content;
  width: fit-content;
  border: none;
  background-color: transparent;
`;

export const Icon = styled(FontAwesomeIcon)`
  height: 14px;
  width: 14px;
  color: #C8C8C8;
`;

