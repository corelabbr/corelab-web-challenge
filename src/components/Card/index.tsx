import React, { ReactNode } from "react";
import styles from "./Card.module.scss";
import { 
  HeartOutline,
  Heart, 
  CloseOutline,
  PencilOutline } from "react-ionicons"

  interface ICard {
  title: string;
  children: ReactNode;
  color: string;
  favorite: boolean
  onClick: () => void;
  onClickToDelete: () => void;
  onClickToEdit: () => void;
}

const Card = (props: ICard) => {

  const preenchido = props.favorite ? <Heart onClick={props.onClick} color={'#000000'} title={""} height="40px"width="40px" /> : <HeartOutline onClick={props.onClick} color={'#000000'} title={""} height="40px"width="40px"/>

  return (
    <div className={styles.Card} style={{backgroundColor: props.color}}>
      <div className={styles.icons}>
        <PencilOutline
          onClick={props.onClickToEdit}
          color={'black'} 
          title={""}
          height="40px"
          width="40px"/>
      
        <CloseOutline
          onClick={props.onClickToDelete}
          color={'#000000'} 
          title={""}
          height="40px"
          width="40px"/>

        {preenchido}
       
      </div>
      <h2>{props.title}</h2>
      
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
