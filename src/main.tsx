import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ResetStyle from './style/ResetStyle';
import GlobalStyle from './style/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
