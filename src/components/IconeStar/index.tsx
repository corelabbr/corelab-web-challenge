import { ReactNode } from "react";

import styles from './Icone.module.scss'
import { AiFillStar } from "react-icons/ai";

interface IIcone {
    onClick: () => void,
    state: Boolean
}
  
  const IconeStar = (props: IIcone) => {
    return (
        <button onClick={props.onClick} className={styles.Icone}>
            <AiFillStar style={ props.state ? { color: 'yellow' } : { color: 'black' }} />
        </button>
    )
  };
  
  export default IconeStar;
  