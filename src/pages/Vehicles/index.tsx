import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

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
      <main className={styles.main}>
        <Search placeholder="Procurar" value='' onChange={(e)=> console.log(e.target.value) } />
        <Button text="Add" onClick={()=> console.log('Testando')}/>
        {vehicles.map((e)=> <Card title={e.name} children={e.board} /> )}
      </main>
    </div>
  );
};

export default VehiclesPage;
