import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

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

  // console.log({ vehicles });

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <div style={{ display: "flex" }}>
          <Search placeholder='Buscar' value={search} onChange={(e: any) => setSearch(e)} />
          <div style={{ width: "54px", height: "39px" }}>t</div>
        </div>

        <Button text='Adicionar' onClick={() => {}} />

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
