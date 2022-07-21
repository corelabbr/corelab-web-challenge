import { createContext } from "react";
import useVehicleProvider from "../../hooks/Vehicle/useVehicleProvider";

const VehicleContext = createContext({});

export function VehicleProvider(props) {
  const { vehicleData, setVehicleData } = useVehicleProvider();

  return (
    <VehicleContext.Provider value={{ vehicleData, setVehicleData }}>
      {props.children}
    </VehicleContext.Provider>
  );
}

export default VehicleContext;
