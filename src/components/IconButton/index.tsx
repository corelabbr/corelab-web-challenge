import React, { ReactNode } from "react";
import styles from "./IconButton.module.scss";

interface IconButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode;
  }
  
  const IconButton: React.FC<IconButtonProps> = ({ ...props }) => {
    return (
      <button {...props} className={styles.IconButton} type="button" aria-label="Edit" role="button" >
        {props.children}
      </button>
    )
  };
  
  export default IconButton;
  