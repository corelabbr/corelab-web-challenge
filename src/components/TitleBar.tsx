import React, { useState, KeyboardEvent } from "react";
import styled from "styled-components";
import { FiSearch } from "react-icons/fi";
import Autosuggest, { ChangeEvent, SuggestionsFetchRequestedParams, SuggestionSelectedEventData } from "react-autosuggest";

const availableColors = [
  { hex: '#BAE2FF', name: 'Azul Claro' },
  { hex: '#B9FFDD', name: 'Verde Claro' },
  { hex: '#FFE8AC', name: 'Amarelo' },
  { hex: '#FFCAB9', name: 'Rosa' },
  { hex: '#F99494', name: 'Vermelho Claro' },
  { hex: '#9DD6FF', name: 'Azul Claro' },
  { hex: '#ECA1FF', name: 'Roxo' },
  { hex: '#DAFF8B', name: 'Verde Limão' },
  { hex: '#FFA285', name: 'Laranja' },
  { hex: '#CDCDCD', name: 'Cinza Claro' },
  { hex: '#979797', name: 'Cinza Escuro' },
  { hex: '#A99A7C', name: 'Marrom' }
];

const hexToColorName: Record<string, string> = {};
availableColors.forEach(color => {
  hexToColorName[color.hex.toLowerCase()] = color.name;
});

interface TitleBarProps {
  onSearch: (searchTerm: string) => void;
}

const TitleBar: React.FC<TitleBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (_: React.FormEvent, { newValue }: ChangeEvent) => {
    setSearchTerm(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string) => <div>{suggestion}</div>;

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : availableColors
          .filter(
            (color) =>
              color.name.toLowerCase().includes(inputValue) ||
              color.hex.toLowerCase().includes(inputValue)
          )
          .map((color) => hexToColorName[color.hex.toLowerCase()]);
  };

  const onSuggestionSelected = (_: React.FormEvent, { suggestionValue }: SuggestionSelectedEventData<string>) => {
    setSearchTerm(suggestionValue);
    onSearch(suggestionValue);
  };
    const onEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    onSearch(searchTerm);
  }
};

const inputProps = {
  placeholder: "Pesquisar notas",
  value: searchTerm,
  onChange: handleChange,
  onKeyPress: onEnterPress,
  style: {
    width: "100%",
  },
  };


  return (
    <Container>
      <SiteLogo src="./logo.svg" alt="Site Logo" />
      <SiteName>Core Notes</SiteName>
      <SearchContainer>
          <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
    />
        <SearchIcon onClick={() => onSearch(searchTerm)}>
          <FiSearch />
        </SearchIcon>
      </SearchContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #FFF;
  display: flex;
  align-items: center;
  padding: 8px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000;
  @media screen and (max-width: 412px) {
   width: 438px;
        margin-right: -13px;
  }
`;


const SiteLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 8px;
`;

const SiteName = styled.h1`
  font-size: 20px;
  color: #455A64;
  margin: 0;
  flex: 0 0 auto;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 530.166px;
  margin-left: 15px;
  @media screen and (max-width:412px) {
    width: 234.166px;
    
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #9E9E9E;
`;

export default TitleBar;
