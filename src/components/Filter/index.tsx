import "./style.css";
import filterImg from "../../assets/filter.png";
import { useContext, useState } from "react";
import { VehicleContext } from "../../contexts/vehicleContext";
import { IVehicle } from "../../types/Vehicle";
import closeFilter from "../../assets/btn-close.png";

interface IFormCar {
  namecar: string;
  initialyear: number;
  limityear: number;
}
const Filter = () => {
  const { vehicles, setVehicles, VehiclesList } = useContext(VehicleContext);
  const [formState, setFormState] = useState<IFormCar>({
    namecar: "",
    initialyear: 0,
    limityear: 0,
  });
  const filtrarVeiculos: IVehicle[] = [];

  const filterVehicles = () => {
    if (formState.namecar) {
      for (let vehicle of vehicles) {
        if (
          vehicle.name
            .toLowerCase()
            .includes(formState.namecar.toLowerCase()) &&
          vehicle.year >= formState.initialyear &&
          vehicle.year <= formState.limityear
        ) {
          filtrarVeiculos.push(vehicle);
        }
      }
      return setVehicles([...filtrarVeiculos]);
    }
  };
  const limparFilter = () => {
    setFormState({ namecar: "", initialyear: 0, limityear: 0 });
    VehiclesList();
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className='filter-vehicles'>
      <div>
        <span>Filter Vehicles</span>
      </div>
      <label>
        <input
          onChange={handleChangeInput}
          name='namecar'
          type='text'
          placeholder='Ex - Honda Civic'
          value={formState.namecar}
        />
      </label>
      <label>
        <span>De:</span>
        <input
          onChange={handleChangeInput}
          type='number'
          name='initialyear'
          id=''
          value={formState.initialyear}
        />
      </label>
      <label>
        <span>Até</span>
        <input
          onChange={handleChangeInput}
          type='number'
          name='limityear'
          id=''
          value={formState.limityear}
        />
      </label>
      <div className='btns-filter'>
        <button onClick={() => filterVehicles()} className='btn-search'>
          Buscar
        </button>
        <button onClick={() => limparFilter()}>Limpar</button>
      </div>
    </div>
  );
};

export default Filter;
