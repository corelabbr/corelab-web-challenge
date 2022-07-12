import React, { ReactNode, useContext, useState } from "react";
import { VehicleContext } from "../../contexts/vehicleContext";
import inactiveLike from '../../assets/inactive-like.svg'
import edit from '../../assets/edit.png'
import like from '../../assets/like.svg'
import carro from '../../assets/carro.jpg'
import btnDelete from '../../assets/btn-close.png'
import { IVehicle } from "../../types/Vehicle";
import "./style.css"
import api from "../../lib/api";

interface ICard {
  title: string;
  children: ReactNode;
  color?:string;
  setTitle?:any
  vehicle:IVehicle
}

const Card = (props: ICard) => {
  const {setOpenModal,setCurrentVehicle,vehicles,setVehicles} = useContext(VehicleContext)
  const [favorite,setFavorite] = useState<boolean>()
  
  function setFavoriteFunction(){
    if (favorite){
      setFavorite(false)
    } else {
      setFavorite(true)
    }
  }

  const deleteVehicle = async () => {
    try {
      const del = await api.delete(`/vehicles/${props.vehicle.id}`)
      const removeVehicle = vehicles.filter((vehicle)=>{
          return vehicle.id !== props.vehicle.id
      })
      setVehicles([...removeVehicle])
    } catch (error) {
      console.log(error)
    }
  }

  function openModalAndSetType(){
    props.setTitle('Edit vehicle')
    setOpenModal(true)
    setCurrentVehicle(props.vehicle)
  }
  return (
    <div className={`card ${props.color}`}>
      <div>
      <h2>{props.title}</h2>
      <img className="img-carro" src={carro} alt='' />
      </div>
      <div className="likeAndEdit">
      <img onClick={()=> setFavoriteFunction()} src={!favorite ? inactiveLike : like} alt='' />
      <img onClick={()=> openModalAndSetType()} src={edit} alt='' />
      </div>
      <img onClick={()=> deleteVehicle()} className="btn-delete" src={btnDelete} alt='' />

      <div>{props.children}</div>
    </div>
  );
};

export default Card;
