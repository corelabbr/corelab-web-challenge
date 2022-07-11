import React from "react";
import styles from "./Select.module.scss";
const Select = ({ label, onSelect, values }) => {
  return (
    <div className={styles.Main}>
      <span className={styles.label}>{label}</span>
      <div className={styles.select}>
        <select
          className={styles.select}
          onChange={onSelect}
          defaultValue="Selecione"
        >
          <option value="selecione">Selecione</option>
          {values.map((item, index) => {
            return (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Select;
