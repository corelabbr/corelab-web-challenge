import { useState } from "react";

export default function useVehicleProvider() {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    brand: "",
    color: "",
    year: 0,
    plate: "",
    price: 0,
    favorite: false,
    createdAt: "",
  });
  return {
    vehicleData,
    setVehicleData,
  };
}
