import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search, AddModal } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [open, setOpen] = useState<Boolean>(false)

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  
  }, []);

  console.log(vehicles)

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Search placeholder="Procurar" value='' onChange={(e)=> console.log(e.target.value) } />
        <Button text="Add" onClick={()=> setOpen(true) }/>

        <AddModal status={open} setStatus={setOpen}/>

        {vehicles.map((e)=> 
          <Card 
            name={e.name} 
            board={e.board} 
            brand={e.brand} 
            color={e.color}
            year={e.year}
            price={e.price}
        /> )}
      </main>
    </div>
  );
};

export default VehiclesPage;
