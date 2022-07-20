import { BrowserRouter } from "react-router-dom";
import { VehiclesProvider } from "./providers/VehiclesProvider";
import { Routes } from "./router";

export function App() {
	return (
		<BrowserRouter>
			<VehiclesProvider>
				<Routes />
			</VehiclesProvider>
		</BrowserRouter>
	);
}
