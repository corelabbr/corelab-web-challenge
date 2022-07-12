import React, { useEffect } from "react";
import styles from "./FilterVehicle.module.scss";
import { BackArrow, SaveButton } from "@/components";
import { DataContext } from "@/context";

interface IInputs {
  inputAlias: string | undefined;
  name: string;
}

const FilterVehicle = ({ characFilter, priceFilter }: any) => {
  const { dataContext } = DataContext();
  const { setShowFilter, newFilter, setNewFilter, vehicleList, favedList, setArrayFiltered } = dataContext;

  const addValue = (value: string, alias: any) => {
    setNewFilter((prev: any) => ({ ...prev, [alias]: value }));
  };

  const filterData = () => {
    let newFavedList = favedList.filter(
      (item) =>
        item.description === newFilter.description ||
        item.color === newFilter.color ||
        Number(item.year) === Number(newFilter.year) ||
        (Number(item.price) > Number(newFilter.precoMin) && Number(item.price)) < Number(newFilter.precoMax)
    );
    let newVehicleList = vehicleList.filter(
      (item) =>
        item.description === newFilter.description ||
        item.color === newFilter.color ||
        Number(item.year) === Number(newFilter.year) ||
        (Number(item.price) > Number(newFilter.precoMin) && Number(item.price)) < Number(newFilter.precoMax)
    );

    newFavedList.push(...newVehicleList);
    setArrayFiltered([...newFavedList]);

    setShowFilter(false);
  };

  return (
    <div className={styles.modal}>
      <BackArrow onClick={() => setShowFilter(false)} />
      <div className={styles.box}>
        <div className={styles.centerBox}>
          {characFilter &&
            characFilter.map((item: IInputs, index: React.Key | null | undefined) => (
              <div key={index}>
                <label htmlFor={item.inputAlias} className={styles.inputLabel}>
                  {item.name}:
                </label>
                <br />
                <input
                  name={item.inputAlias}
                  className={styles.inputComponent}
                  onChange={(e) => addValue(e.target.value, item.inputAlias)}
                />
                <br />
              </div>
            ))}
        </div>
        <div className={styles.priceFilter}>
          {priceFilter &&
            priceFilter.map((item: any, index: any) => (
              <div key={index}>
                <label htmlFor={item.inputAlias} className={styles.labelPrice}>
                  {item.name}
                </label>
                <br />
                <input
                  className={styles.inputPrice}
                  name={item.inputAlias}
                  onChange={(e) => addValue(e.target.value, item.inputAlias)}
                />
              </div>
            ))}
        </div>

        <div className={styles.saveContainer}>
          <SaveButton
            text='Salvar'
            onClick={() => {
              filterData();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterVehicle;
