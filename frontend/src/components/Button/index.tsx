/* eslint-disable prettier/prettier */

import { ButtonProps } from "../../types/ButtonTypes";

const Button = (props: ButtonProps) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

export default Button;
