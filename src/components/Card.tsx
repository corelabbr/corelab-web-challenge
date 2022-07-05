import React, { ReactNode } from "react";


interface ICard {
  title: string;
  children: ReactNode;
}

const Card = (props: ICard) => {
  return (
    <div >
      <h2>{props.title}</h2>

      <div >{props.children}</div>
    </div>
  );
};

export default Card;
