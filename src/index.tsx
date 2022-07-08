import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Navbar } from './components';
import './index.module.scss';
import VehiclesPage from './pages/Vehicles';
import { MenuMobileProvider } from './providers/MenuMobile';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MenuMobileProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<VehiclesPage />} />
        </Routes>
      </MenuMobileProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
