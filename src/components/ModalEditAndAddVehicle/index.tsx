import "./style.css";
import btnClose from "../../assets/btn-close.png";
import { useContext, useState } from "react";
import api from "../../lib/api";
import { VehicleContext } from "../../contexts/vehicleContext";
import {IformState} from '../../types/Vehicle'

interface IModal {
  title?: string;
}

const Modal = (props: IModal) => {
  const {setOpenModal,currentVehicle,setVehicles,vehicles,openModal,VehiclesList} = useContext(VehicleContext)
  const [formState, setFormState] = useState<IformState>(props.title === 'Edit vehicle' ? {name:currentVehicle.name, description:currentVehicle.description
  ,plate:currentVehicle.plate, year:currentVehicle.year, color:currentVehicle.color, price:currentVehicle.price} : {});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (props.title === 'Edit vehicle'){
      try {
        const editVehicle = await api.put(`/vehicles/${currentVehicle.id}`,formState)
        setOpenModal(false)
        VehiclesList()

      } catch (error) {
        console.log(error)
      }
      return;
    }
    if (
      !formState?.name ||
      !formState?.description ||
      !formState?.plate ||
      !formState?.year ||
      !formState?.color ||
      !formState.price
    ) {
      return alert("Todos os campos são obrigatórios");
    }
    const {data:newVehicle} = await api.post("/vehicles", formState);
    setVehicles([...vehicles,newVehicle])
    setOpenModal(false)
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit} className='form-modal-register'>
        <h2>{props.title}</h2>
        <img className='btn-close' onClick={()=> setOpenModal(false)} src={btnClose} alt='' />
        <label>
          <span>Name</span>
          <input onChange={handleChangeInput} type='text' name='name' value={formState.name} placeholder='Honda Civic' />
        </label>
        <label>
          <span>Description</span>
          <input onChange={handleChangeInput} type='text' name='description' value={formState.description} placeholder='description' />
        </label>
        <label>
          <span>Plate</span>
          <input onChange={handleChangeInput} type='text' name='plate' value={formState.plate} placeholder='XXX1010' />
        </label>
        <label>
          <span>Year</span>
          <input onChange={handleChangeInput} type='number' name='year'value={formState.year} placeholder='2016' />
        </label>
        <label>
          <span>Color</span>
          <input onChange={handleChangeInput} type='text' name='color' value={formState.color} placeholder='vermelho' />
        </label>
        <label>
          <span>Price</span>
          <input onChange={handleChangeInput} type='number' name='price' value={formState.price} placeholder='' />
        </label>
        <button type='submit'>{props.title}</button>
      </form>
    </div>
  );
};

export default Modal;
