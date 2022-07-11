import React from "react";
import styles from "./FilterVehicle.module.scss";
import { BackArrow, SaveButton } from "../../components";

interface IInputs {
  inputAlias: string | undefined;
  name: string;
}

const FilterVehicle = ({ characFilter, priceFilter }: any) => {
  return (
    <div className={styles.modal}>
      <BackArrow />
      <div className={styles.box}>
        <div className={styles.centerBox}>
          {characFilter &&
            characFilter.map((item: IInputs, index: React.Key | null | undefined) => (
              <div key={index}>
                <label htmlFor={item.inputAlias} className={styles.inputLabel}>
                  {item.name}:
                </label>
                <br />
                <input name={item.inputAlias} className={styles.inputComponent} />
                <br />
              </div>
            ))}
        </div>
        <div className={styles.priceFilter}>
          {priceFilter &&
            priceFilter.map((item: any) => (
              <div>
                <label htmlFor={item.inputAlias} className={styles.labelPrice}>
                  {item.name}
                </label>
                <br />
                <input className={styles.inputPrice} name={item.inputAlias} />
              </div>
            ))}
        </div>

        <div className={styles.saveContainer}>
          <SaveButton text='Salvar' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default FilterVehicle;
