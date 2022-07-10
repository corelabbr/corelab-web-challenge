import React from "react";
import { SaveButton } from "../../components";
import styles from "./AddVehicle.module.scss";

interface IInputs {
  inputAlias: string | undefined;
  name: string;
}

const AddVehicle = ({ data }: any) => {
  return (
    <div className={styles.modal}>
      <div>
        <img src='./backArrow.svg' alt='voltar para página principal' className={styles.backArrow} />
      </div>
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
        <div style={{ display: "grid", height: "100px", placeItems: "end", padding: "10px" }}>
          <SaveButton text='Salvar' onClick={() => {}} style={{}} />
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
