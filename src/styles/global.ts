import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  body {
    background-color: #F0F2F5;
  }
  input, textarea, button{
    font-family: 'Inter', sans-serif;
  }
  * {
    box-sizing: border-box;
    outline: 0;
    padding: 0;
    margin: 0;
  }
`;
