import React from 'react'
import {BrowserRouter, Link, Route, Routes, useLocation} from 'react-router-dom'
import { ConfigProvider } from './contexts/config'
import AddVehiclePage from './pages/AddVehicle'
import EditVehiclePage from './pages/EditVehicle'
import RemoveVehiclePage from './pages/RemoveVehicle'
import VehiclesPage from './pages/Vehicles'
import VehiclesFilterPage from './pages/VehiclesFilter'

import { Helmet } from 'react-helmet'

const passingTitle = (title: string, element: JSX.Element) => (
    <>
        <Helmet>
            <title>{'Add Vehicle'}</title>
        </Helmet>
        {element}
    </>
)

const LocationDisplay = () => {
    const location = useLocation()
  
      return <div style={{ opacity: 0 }} data-testid="location-display">{location.pathname}</div>
}

const App = () => (
    <ConfigProvider>
        <Routes>
            <Route path="/" element={passingTitle('Vehicles', <VehiclesPage />)} />
            <Route path="/add-vehicle" element={passingTitle('Add Vehicle', <AddVehiclePage />)} />
            <Route path="/edit-vehicle/:id" element={passingTitle('Edit Vehicle', <EditVehiclePage />)} />
            <Route path="/remove-vehicle/:id" element={passingTitle('Remove Vehicle', <RemoveVehiclePage />)} />
            <Route path="/filter" element={passingTitle('Vehicles Filter', <VehiclesFilterPage />)} />
        </Routes>
        <LocationDisplay />
    </ConfigProvider>
)

export default App