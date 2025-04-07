/* eslint-disable prettier/prettier */
import { useEffect, useState } from "react";
import { get } from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await get("/vehicles");
        setVehicles(data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  console.log({ vehicles });

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Search placeholder="Search" value={search} onChange={() => {}} />

        <Button text="Add new vehicle" onClick={() => {}} />

        <Card title="Sandero Stepway">
          <p>Price: 22000</p>
          <p>Description: Carro usado por 2 anos...</p>
          <p>Year: 2018</p>
        </Card>
      </main>
    </div>
  );
};

export default VehiclesPage;
