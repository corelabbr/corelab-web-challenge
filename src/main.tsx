import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Global from './styles/global.ts';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Global />
    <App />
    <ToastContainer />
  </React.StrictMode>,
)
