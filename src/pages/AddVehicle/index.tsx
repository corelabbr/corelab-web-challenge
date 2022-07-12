import React, { useEffect } from "react";
import { SaveButton, BackArrow } from "@/components";
import styles from "./AddVehicle.module.scss";
import { DataContext } from "@/context";
import { useAxios } from "@/hooks";

interface IInputs {
  inputAlias: string | undefined;
  name: string;
  type: string;
  maxLength: number;
}

const AddVehicle = ({ data }: { data: IInputs[] }): JSX.Element => {
  const { dataContext } = DataContext();
  const { setShowAdd, newVehicle, setNewVehicle } = dataContext;

  const { axiosRequest } = useAxios();
  const { fetchData } = axiosRequest;

  const addValue = (value: string, alias: any) => {
    setNewVehicle((prev: any) => ({ ...prev, [alias]: value }));
  };

  const createVehicle = {
    url: "/create",
    method: "post",
    data: {
      ...newVehicle,
    },
  };

  return (
    <div className={styles.modal}>
      <BackArrow onClick={() => setShowAdd(false)} />
      <div className={styles.box}>
        <div className={styles.centerBox}>
          {data &&
            data.map((item: IInputs, index: React.Key | null | undefined) => (
              <div key={index}>
                <label htmlFor={item.inputAlias} className={styles.inputLabel}>
                  {item.name}:
                </label>
                <br />
                <input
                  maxLength={item.maxLength}
                  type={item.type}
                  name={item.inputAlias}
                  onChange={(e) => addValue(e.target.value, item.inputAlias)}
                  className={styles.inputComponent}
                />
                <br />
              </div>
            ))}
        </div>
        <div className={styles.saveContainer}>
          <SaveButton
            text='Salvar'
            onClick={() => {
              setTimeout(() => {
                setShowAdd(false);
              }, 1000);
              createVehicle.data.year = Number(createVehicle.data.year);
              createVehicle.data.price = Number(createVehicle.data.price);
              fetchData(createVehicle);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
