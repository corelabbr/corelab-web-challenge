import React from 'react';
import { ToastContainer } from 'react-toastify';

import './styles/reset.scss';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Navbar from './components/NavBar';
import ModalConfirmation from './components/ModalConfirmation';
import LoadingModal from './components/LoadingModal';

function App() {
  return (
    <section className="relative">
      <Navbar />
      <Home />
      <ModalConfirmation />
      <LoadingModal />
      <ToastContainer />
    </section>
  );
}

export default App;
