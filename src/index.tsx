import React from 'react';
import ReactDOM from 'react-dom/client';
import NotesPage from './pages/Notes';
import reportWebVitals from './reportWebVitals';
import { Header } from './components/index'
import { SearchProvider } from './providers/SearchContext';
import './index.module.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SearchProvider>
      <Header />
      <NotesPage />
    </SearchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
