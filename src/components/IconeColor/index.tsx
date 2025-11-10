import React from 'react';
import styles from './Icone.module.scss';
import { AiOutlineBgColors } from "react-icons/ai";
import ColorItem from "../Color";
import axios from 'axios';
import useSWR from 'swr';

interface IIcone {
  onClick: () => void,
  id: string,
  children: any
}


const IconeColor: React.FC<IIcone> = (props) => {

  return (
    <button className={styles.Icone}>
      {props.children}
    </button>
  );
};

export default IconeColor;
