import React from 'react'
import styled, { keyframes } from 'styled-components'

const BoxMessage = styled.div`
  width: 280px;
  height: 90px;
  box-shadow:
    0 4px 20px 0 rgba(0 0 0 / 14%),
    0 7px 10px -5px rgba(0 100 212 / 40%);
  font-family: sans-serif;
  background-color: #ffffff;
  color: #383838;
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  z-index: 1;
  position: fixed;
  top: 2%;
  left: 6%;
  animation: ${(props) => props.request && slideDown} 0.3s forwards;
  transform-origin: top;
  visibility: ${(props) => (props.request ? 'visible' : 'hidden')};

  @media (min-width: 375px) {
    left: 13%;
  }
  @media (min-width: 425px) {
    left: 17%;
  }
  @media (min-width: 768px) {
    left: 33%;
  }
  @media (min-width: 1024px) {
    left: 36%;
  }
  @media (min-width: 1440px) {
    left: 41%;
  }
  @media (min-width: 2560px) {
    left: 44%;
  }
`

const slideDown = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
`
const Img = styled.img`
  padding: 1px;
`
export default function PopUpMessage({ error, children, ...props }) {
  return (
    <>
      <BoxMessage {...props} request>
        {children}
        {error ? <Img src="error.png" /> : <Img src="/check.png" />}
      </BoxMessage>
    </>
  )
}
