import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search, AddModal } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  
  const [open, setOpen] = useState<Boolean>(false)
  const [search, setSearch] = useState<string>('')

  const filtred = vehicles.filter((e)=> 
  e.name.startsWith(search) || 
  e.brand.startsWith(search) )

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  
  }, []);


  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Search placeholder="Procurar" value={search} onChange={(e)=> setSearch(e.target.value) } />
        <Button text="Add" onClick={()=> setOpen(true) }/>

        <div className={styles.Favorites}>
          <h2>Favoritos</h2>
          {filtred.map((e)=> e.isFavorite && (
                <Card 
                  id={e.id}
                  name={e.name} 
                  board={e.board} 
                  brand={e.brand} 
                  color={e.color}
                  year={e.year}
                  price={e.price}
                />
          ))}
        </div>

            <div className={styles.Ad}>
              <h2>Anuncios</h2>
                {filtred.map((e)=> e.isFavorite == false && (
                  <Card 
                    id={e.id}
                    name={e.name} 
                    board={e.board} 
                    brand={e.brand} 
                    color={e.color}
                    year={e.year}
                    price={e.price}
                  />
                ))}
            </div>
            
           

        <AddModal status={open} setStatus={setOpen}/>
      </main>
    </div>
  );
};

export default VehiclesPage;
