import React from 'react';
import ReactDOM from 'react-dom/client';

import { ConfigProvider } from './contexts/config';

// import bootstrap and my custom global css after
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.module.scss';

// import your route components too
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
