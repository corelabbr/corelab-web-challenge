import { useEffect, useState } from "react";
import { getVehicles } from "@/lib/api";
import { IVehicle } from "@/types/Vehicle";

import AddVehicle from "@/pages/AddVehicle";
import FilterVehicle from "@/pages/FilterVehicle";

import { Button, Card, Search, FilterButton } from "@/components";
import { vehicleInfo, filterVehicle, priceVehicle } from "@/data";

import { DataContext } from "@/context";

import styles from "./Vehicles.module.scss";

// TODO: implementar o fetch

const VehiclesPage = () => {
  const { dataContext } = DataContext();

  const { showAdd, setShowAdd, showFilter, setShowFilter, searchValue, setSearchValue, vehicleState, setVehicleState } =
    dataContext;

  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     const payload = await getVehicles();
  //     setVehicles(payload);
  //   };

  //   fetchVehicles();
  // }, []);

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <div className={styles.container}>
          <Search
            placeholder='Buscar'
            value={searchValue}
            onChange={({ target }) => {
              setSearchValue(target.value);
            }}
          />
          <FilterButton onClick={() => setShowFilter(true)} />
        </div>

        <Button
          text='Adicionar'
          onClick={() => {
            setShowAdd(true);
          }}
        />
        {showAdd && <AddVehicle data={vehicleInfo} />}
        {showFilter && <FilterVehicle characFilter={filterVehicle} priceFilter={priceVehicle} />}

        <Card title='Sandero Stepway'>
          <p>Price: 22000</p>
          <p>Description: Carro usado por 2 anos...</p>
          <p>Year: 2018</p>
        </Card>
      </main>
    </div>
  );
};

export default VehiclesPage;
