import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VehiclesPage from './pages/Vehicles';
import { VehicleContextProvider } from './contexts/vehicleContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <VehicleContextProvider>
    <VehiclesPage />
    </VehicleContextProvider>
  </React.StrictMode>
);

