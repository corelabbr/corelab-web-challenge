import styles from "./Card.module.scss";

import Pencil from '../../assets/pencil.png'
import Del from '../../assets/X.png'
import Fav from '../../assets/favorite.png'

import { EditModal } from '../index'
import { useState } from "react";
import { myFetch } from '../../lib/api'


export interface ICard {
  id : string;
  name: string;
  brand: string;
  board : string;
  color : string;
  year : number | string;
  price : number | string;
}

const Card = (props: ICard) => {

    const [open, setOpen] = useState<Boolean>(false)

  // ----------------------------------------------------------------------- //
  
    function Delete() : void {

      const data = {
        board : props.id
      }

      myFetch('/del-car', 'DELETE', data)

      setTimeout(()=>{
        window.location.reload()
      }, 100)
    }

    function handleFavorite(id : string){
      myFetch('/favorite', 'POST', {id : id})

      setTimeout(() => {
        window.location.reload()
      }, 300);
    }



  // ----------------------------------------------------------------------- // 

  return (
    <>
    <div className={styles.Card}>
      <div className={styles.Color} style={{ background : props.color }}/>

      <div className={styles.Texts}>
        <p className={styles.Title}><strong>{props.brand}</strong> - {props.name}</p>
        <p className={styles.Price}>RS$ {props.price}</p>
        <p className={styles.Year}>{props.year}</p>

        <div className={styles.Images}>
        <p>{props.board}</p>

        <div>
          <img src={Pencil} alt='Editar' onClick={()=> setOpen(true) } />
          <img src={Del} alt='Deletar' onClick={()=> Delete() } />
          <img src={Fav} onClick={()=> handleFavorite(props.id)} />
        </div>
        
      </div>
      </div>

      
    </div>

    <EditModal 
      status={open} 
      setStatus={setOpen}
      id={props.id}
      name={props.name}
      brand={props.brand}
      color={props.color}
      year={props.year}
      board={props.board}
      price={props.price}
    />
  </>
  );
};

export default Card;
