import React from 'react'
import styled from 'styled-components'


const StyledButton = styled.button`
  padding: 7px;
  width: 110px;
  height: 35px;
  background: rgba(69, 90, 100, 1);
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  :hover {
    background: #3c474d;
  }
 
`

export const Button = ({ ...props }) => {

  return <StyledButton {...props}  />
}
