import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearch = styled.input`
  width: 530.166px;
  border-radius: 3px;
  border: 1px solid #D9D9D9;
  background: #FFF;
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);
  height: 28px;
  padding-left: 10px;
  background-image: url('search.png');
  background-repeat: no-repeat;
  background-position: right 10px center;

  @media (max-width: 750px) {
    margin-right: 50px;
  }
`;

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
    onSearch(newValue); // Chama a função de pesquisa no componente pai
  };

  return (
    <StyledSearch
      placeholder='pesquisar notas'
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}
