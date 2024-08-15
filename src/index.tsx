import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import reportWebVitals from './reportWebVitals';
import Posts from './pages/Posts/Posts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Posts/>
  </React.StrictMode>
);


reportWebVitals();
