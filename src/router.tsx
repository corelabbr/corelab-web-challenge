import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactModal from "react-modal";

import Vehicles from "./pages/Vehicles";
import Homepage from "./pages/Homepage";
import NewCar from "./pages/NewCar";
import Edit from "./pages/Edit";

ReactModal.setAppElement("#root");

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/example" element={<Vehicles />} />
        <Route path="/new" element={<NewCar />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
