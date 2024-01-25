import React from "react";
import styles from "./styles.module.scss";
import { Colors } from "@/app/enums/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface propsType {
  changeColor: (color: Colors) => void;
  clearColor?: () => void;
  isVertical: boolean;
  hasClearColorOption: boolean;
}

export default function ColorPicker(props: propsType) {
  const { changeColor, isVertical, hasClearColorOption, clearColor } = props;

  const containerClass = isVertical ? styles.vertical_container : styles.container;

  return (
    <ul className={containerClass}>
      {hasClearColorOption && (
        <li onClick={clearColor} className={styles.icon} style={{ backgroundColor: "#ffffff" }}>
          <FontAwesomeIcon icon={faXmark} className={styles.icon} />
        </li>
      )}

      {Object.values(Colors).map((color, index) => {
        let style;
        if (color === Colors.WHITE) {
          style = {
            backgroundColor: color,
            border: "1px solid lightgrey",
          };
        } else {
          style = {
            backgroundColor: color,
          };
        }

        return <li key={index} value={color} style={style} onClick={() => changeColor(color)}></li>;
      })}
    </ul>
  );
}
