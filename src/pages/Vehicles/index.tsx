import { useEffect, useState } from "react";
import { getVehicles } from "@/lib/api";
import { IVehicle } from "@/types/Vehicle";

import { FilterVehicle, AddVehicle } from "@/pages";

import { Button, Card, Search, FilterButton } from "@/components";
import { vehicleInfo, filterVehicle, priceVehicle } from "@/data";

import styles from "./Vehicles.module.scss";

// TODO: implementar o fetch

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");

  // useEffect(() => {
  //   const fetchVehicles = async () => {
  //     const payload = await getVehicles();
  //     setVehicles(payload);
  //   };

  //   fetchVehicles();
  // }, []);

  console.log(vehicleInfo);

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <div className={styles.container}>
          <Search placeholder='Buscar' value={search} onChange={(e) => {}} />
          <FilterButton />
        </div>

        <Button text='Adicionar' onClick={() => {}} />
        <AddVehicle data={vehicleInfo} />
        <FilterVehicle characFilter={filterVehicle} priceFilter={priceVehicle} />

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
