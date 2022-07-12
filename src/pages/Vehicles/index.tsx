import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import filter from "../../icons/filter.png"

import { useNavigate } from 'react-router-dom'

const VehiclesPage = () => {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  }, []);

  console.log({ vehicles });

  return (
    
    <div className={styles.Vehicles}>
      <nav className={styles.nav}></nav>
      <main>
        <div className={styles.containerCenter}>
          <Search placeholder="Search" value={search} onChange={() => {}} />
          <img className={styles.img} src={filter}></img> 
          {/* TODO: cria botão  */}
        </div>
        <div className={styles.containerCenter}>
          <Button text="Adicionar" onClick={() => {navigate("/create")}} />
        </div>
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
