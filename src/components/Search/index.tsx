import { useContext, useEffect, useState } from "react";
import "./style.css";
import { VehicleContext } from "../../contexts/vehicleContext";
import { IVehicle } from "../../types/Vehicle";

interface ISearch {
  placeholder: string;
  value?: string;
}

const Search = (props: ISearch) => {
  const { vehicles, setVehicles,VehiclesList } = useContext(VehicleContext);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    const filtrarVeiculos: IVehicle[] = [];
    
    if (e.target.value) {
      vehicles.map((vehicle)=> {
        if (vehicle.name.toLowerCase().includes(search)) {
          filtrarVeiculos.push(vehicle);
        }
      })
      return setVehicles([...filtrarVeiculos]);
    }
    VehiclesList()
  };

  return (
    <input
      className='input-search'
      type='text'
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}
    />
  );
};

export default Search;
