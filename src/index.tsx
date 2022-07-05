import * as React from 'react';
import ReactDOM from 'react-dom/client';
import VehiclesPage from './pages/Vehicles';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../src/styles/theme'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ChakraProvider theme={theme}>

    <React.StrictMode>
      <VehiclesPage />
    </React.StrictMode>

  </ ChakraProvider>
);


reportWebVitals();
