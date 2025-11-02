import React from "react";
import { IconType } from "react-icons";
import styles from "./IconButton.module.scss";
interface IconButtonProps {
  Icon: IconType;
  onClick?: () => void;
  size?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

const IconButton: React.FC<IconButtonProps> = (
  { Icon, onClick, size = 24, color = "#4f4f4f", className = "" },
  ...rest
) => {
  return (
    <button
      onClick={onClick}
      className={`${className}` + styles.Icon}
      {...rest}
    >
      {Icon && <Icon size={size} color={color} />}
    </button>
  );
};

export default IconButton;
