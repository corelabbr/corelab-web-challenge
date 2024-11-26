import React from 'react'
import styled from 'styled-components'

const LogoConatainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`
const Text = styled.h3`
  font-family: Inter;
  font-size: 11.45px;
  font-weight: 600;
  line-height: 13.86px;
  text-align: left;
  color: rgba(69, 90, 100, 1);

  @media (min-width: 600px) {
    font-size: 14.45px;
  }
`
const ImgLogo = styled.img`
  padding: 7px;
`
export default function Navbar() {
  return (
    <LogoConatainer>
      <ImgLogo src="logo.png" />
      <Text>GambNotes</Text>
    </LogoConatainer>
  )
}
