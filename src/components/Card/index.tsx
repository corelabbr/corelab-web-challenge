import styles from "./Card.module.scss";

import Pencil from '../../assets/pencil.png'
import Del from '../../assets/X.png'

import { EditModal } from '../index'
import { useEffect, useState } from "react";

interface ICard {
  name: string;
  brand: string;
  board : string;
  color : string;
  year : number;
  price : number;
}

const Card = (props: ICard) => {

    const [open, setOpen] = useState<Boolean>(false)

  // ----------------------------------------------------------------------- //
  
    function Delete() : void {

      const data = {
        board : props.board
      }

      const config = {
        method : 'DELETE',
        headers : new Headers({ 'Content-type' : 'application/json' }),
        body : JSON.stringify(data)
      }

      fetch('http://localhost:3000/del-car', config)
      setTimeout(() => {
          window.location.reload()
      }, 300);
    }

    function setTrue() : void {
      setOpen(true)
    }

    console.log(open)


  // ----------------------------------------------------------------------- // 

  return (
    <>
    <div className={styles.Card}>
      <h2>{props.brand} - {props.name}</h2>
      <div className={styles.Images}>
        <img src={Pencil} alt='Editar' onClick={()=> setTrue() } />
        <img src={Del} alt='Deletar' onClick={()=> Delete() } />
      </div>
    </div>

    <EditModal status={open} setStatus={setOpen} />
  </>
  );
};

export default Card;
