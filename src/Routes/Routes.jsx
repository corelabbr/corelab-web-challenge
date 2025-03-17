import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from "react";

import Cadastro from "../pages/Cadastro";
import Hearder from "../components/Header/Hearder";

import LerCard from "../components/Card/LerCard";

import CardProvider from "../context/CardContext";
import FavoritosProvider from "../context/FavoritosContext";
import ColorProvider from "../context/ColorContext";
import Home from "../pages/Home";


const AppRoutes = () => {
  return (
    <>
      <Router>
        <CardProvider>
          <FavoritosProvider>
            <ColorProvider>
              <Hearder />
              <Routes>
                <Route path="/" element={<Home />} />
               
                <Route path="/:id" element={<LerCard />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/edit/:id" element={<Cadastro />} />
                 </Routes>
            </ColorProvider>
          </FavoritosProvider>
        </CardProvider>
      </Router>
    </>
  );
};
export default AppRoutes;
