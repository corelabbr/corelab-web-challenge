import React from 'react';
import styles from './Color.module.scss';
import axios from 'axios';
import useSWR from 'swr';

interface IColor {
  color: string,
  setColor: (color: string) => void,
  id: string
}

const fetcher = (url: string)  => axios.get(url).then((res) => res.data)

const ColorItem: React.FC<IColor> = (props) => {
  
  const { data } = useSWR('http://localhost:3003/get', fetcher)

  return(
    <div className={styles.colorItem} onClick={() => data.map((item: any, index: number) => { props.id === item.id ? props.setColor(props.color) : props.setColor('white')})} style={{ backgroundColor: props.color }}></div>
  )
}

export default ColorItem;
