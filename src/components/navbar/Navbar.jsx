import React, { useState } from 'react'
import styled from 'styled-components'

import Logo from '../logo/Logo'
import { Input } from '../form/Input'

const NavContainer = styled.div`
  width: 100%;
  height: 57px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 7px 0px rgba(149, 149, 149, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
`
const SearchContainer = styled.div`
  padding: 0 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 50%;
  height: 28px;
  border-radius: 3px 0px 0px 0px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(217, 217, 217, 1);
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.25);

  @media (min-width: 2560px) {
    width: 40%;
  }
`
const Img = styled.img`
  padding: 7px;
  cursor: pointer;
`

const StyledFlexSearchAndLogo = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
`
const InputSearch = styled(Input)`
  padding: 15px;
`

export default function Navbar({ onSearchChange, onCleanInput, ...props }) {
  const [searchNote, setSearchNote] = useState('')

  const handleSearchChange = (e) => {
    setSearchNote(e.target.value)
    if (typeof onSearchChange === 'function') {
      onSearchChange(searchNote)
    }
  }
  const cleanInput = () => {
    if (typeof onCleanInput === 'function') {
      onCleanInput(setSearchNote(''))
    }
  }
  return (
    <NavContainer {...props}>
      <StyledFlexSearchAndLogo>
        <Logo />
        <SearchContainer>
          <InputSearch
            value={searchNote}
            onChange={handleSearchChange}
            placeholder="Pesquisar Notas"
            useControllerFlag={false}
          />
          <Img src="lupa.png" />
        </SearchContainer>
      </StyledFlexSearchAndLogo>
      <Img onClick={cleanInput} src="x.png" />
    </NavContainer>
  )
}
