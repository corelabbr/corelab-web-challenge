import { ReactNode } from "react";

import styles from './Icone.module.scss'
import { AiFillEdit } from "react-icons/ai";

interface IIcone {
    onClick: () => void,
}
  
  const IconeEdit = (props: IIcone) => {
    return (
        <button className={styles.Icone}>
            <AiFillEdit />
        </button>
    )
  };
  
  export default IconeEdit;
  