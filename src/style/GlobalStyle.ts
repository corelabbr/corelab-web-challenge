import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    scrollbar-width: thin;
    scrollbar-color: #b46e3f transparent;
    font-family: 'Inter', sans-serif;
  }

  * {
    font-style: normal;
    font-weight: 400;
    box-sizing: border-box;
  }

  .custom-popup-class {
    font-family: 'Inter', sans-serif;
  }

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    width: 100%;
    padding: 12px;
  }

  h1 {
    font-weight: 700;
    font-size: 26px;
    color: white;
  }

  input {
    font-size: 20px;
    width: calc(100% - 30px);
    border-radius: 5px;
    outline: none;
    border: 1px solid #ccc;
    padding: 15px;
    margin: 1px;
    :focus {
      border-color: #fca311;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px;
    width: 100%;
    border-radius: 5px;
  }

  a {
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: white;
    text-decoration: none;
    padding-top: 30px;
  }
`;

export default GlobalStyle;
