import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateVehicle from "./pages/createVehicle";
import VehiclesPage from "./pages/Vehicles";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<VehiclesPage />} />
      <Route path="/create" element={<CreateVehicle />} />
    </Routes>
  );
}

export default Router;
