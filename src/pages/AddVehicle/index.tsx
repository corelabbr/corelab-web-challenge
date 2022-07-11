import React from "react";
import { SaveButton, BackArrow } from "../../components";
import styles from "./AddVehicle.module.scss";

interface IInputs {
  inputAlias: string | undefined;
  name: string;
}

const AddVehicle = ({ data }: { data: IInputs[] }): JSX.Element => {
  return (
    <div className={styles.modal}>
      {/* <BackArrow /> */}
      <div className={styles.box}>
        <div className={styles.centerBox}>
          {data &&
            data.map((item: IInputs, index: React.Key | null | undefined) => (
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
        <div className={styles.saveContainer}>{/* <SaveButton text='Salvar' onClick={() => {}} /> */}</div>
      </div>
    </div>
  );
};

export default AddVehicle;
