import styles from "./Card.module.scss";

import Pencil from '../../assets/pencil.png'
import Del from '../../assets/X.png'

import { EditModal } from '../index'
import { useState } from "react";
import { myFetch, API } from '../../lib/api'


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

      myFetch('/del-car', 'DELETE', data)

      setTimeout(()=>{
        window.location.reload()
      }, 100)
    }


  // ----------------------------------------------------------------------- // 

  return (
    <>
    <div className={styles.Card}>
      <div className={styles.Color}/>

      <div className={styles.Texts}>
        <p className={styles.Title}><strong>{props.brand}</strong> - {props.name}</p>
        <p className={styles.Price}>RS$ {props.price}</p>
        <p className={styles.Year}>{props.year}</p>

        <div className={styles.Images}>
        <p>{props.board}</p>

        <div>
          <img src={Pencil} alt='Editar' onClick={()=> setOpen(true) } />
          <img src={Del} alt='Deletar' onClick={()=> Delete() } />
        </div>
        
      </div>
      </div>

      
    </div>

    <EditModal status={open} setStatus={setOpen} />
  </>
  );
};

export default Card;
