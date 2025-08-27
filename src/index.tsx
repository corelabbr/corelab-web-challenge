import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/fonts.scss';
import './styles/globals.scss';
import './index.module.scss';
import NotesPage from './pages/Notes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NotesPage />
  </React.StrictMode>
);

reportWebVitals();
