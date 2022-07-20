import { Routes, Route } from "react-router-dom";
import { CreateVehicle, FilterOptions, UpdateVehicle, VehiclesPage } from "../pages";

function RoutesComponent() {
	return (
		<Routes>
			<Route path="/" element={<VehiclesPage />}></Route>
			<Route path="/create" element={<CreateVehicle />}></Route>
			<Route path="/update/:id" element={<UpdateVehicle />}></Route>
			<Route path="/filter-options" element={<FilterOptions />}></Route>
		</Routes>
	);
}

export { RoutesComponent as Routes };
