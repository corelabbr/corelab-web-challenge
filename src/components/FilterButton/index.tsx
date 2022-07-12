import React from "react";
import styles from "./Filter.module.scss";

interface IFilter {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const FilterButton = (props: IFilter) => {
  return (
    <div className={styles.filterContainer} onClick={props.onClick}>
      <img src='./assets/config.svg' alt='configurações' className={styles.configIcon} />
    </div>
  );
};

export default FilterButton;
