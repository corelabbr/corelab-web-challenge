import React from 'react'
import { 
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";


import Index from '../pages/Vehicles/index'
import AddVehicles from '../pages/AddVehicles/AddVehicles';
import EditVehicles from '../pages/EditVehicles/EditVehicles';

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route  path="/" element={<Index/>}/>
          <Route  path="/newvehicle" element={<AddVehicles/>}/>
          <Route  path="/vehicle/:id" element={<EditVehicles/>}/>
        </Routes>
      </Router>
    </div>

  )
}

export default AppRoutes
