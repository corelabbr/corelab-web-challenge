import styled from 'styled-components'

import Search from '../search/Search'

const StyledNavbar = styled.div`
    width: 100%;
    height: 57px;
    background-color: white;
`

const ComponentsNavbar = styled.div`
    display: flex;
    gap: 20px;
    height: 100%;
    align-items: center;
    margin-left: 36px;
`

const TextLogo = styled.p`
    color: #455A64;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

export default function Navbar({ onSearch }) {
    return(
        <StyledNavbar>
            <ComponentsNavbar>
                <img src='logo.png'/>
                <TextLogo>CoreNotes</TextLogo>
                <Search onSearch={onSearch}/>
            </ComponentsNavbar>
        </StyledNavbar>
    )
}