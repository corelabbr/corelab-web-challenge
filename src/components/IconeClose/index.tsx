import { ReactNode } from "react";

import styles from './Icone.module.scss'
import { AiOutlineBgColors, AiOutlineClose } from "react-icons/ai";

interface IIcone {
    onClick: () => void,
}
  
  const IconeClose = (props: IIcone) => {
    return (
        <button onClick={props.onClick} className={styles.Icone}>
            <AiOutlineClose />
        </button>
    )
  };
  
  export default IconeClose;
  