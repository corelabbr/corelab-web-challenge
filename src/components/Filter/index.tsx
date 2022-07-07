import React from "react";

import styles from './Filter.module.scss'
import FilterImg from '../../assets/filter.png'

interface IFilter {
    onClick : ()=> void;
}

const Filter = (props : IFilter)=>{
    return(
        <div className={styles.FilterDiv} onClick={props.onClick}>
            <img src={FilterImg} alt='Filter' />
        </div>
    )
}

export default Filter;