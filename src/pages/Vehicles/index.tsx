import {
  ChangeEvent, useEffect, useState,
} from 'react';
import { GiSettingsKnobs } from 'react-icons/gi';
import { Button, Card, Search } from '../../components';

import styles from './Vehicles.module.scss';
import { IVehicle } from '../../types/Vehicle';
import { getVehicles } from '../../lib/api';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload.data);
      setLoading(false);
    };

    fetchVehicles();
  }, []);

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.Vehicles}>

      <main className={styles.main}>
        <div className={styles.wrapperSearch}>
          <Search
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />
          <button type="button" className={styles.btn}>
            <GiSettingsKnobs size={32} className={styles.icon} />
          </button>
        </div>

        <Button text="Add new vehicle" onClick={() => {}} />
        { loading && <div className={styles.loading}>Loading...</div> }
        {
          !loading && vehicles.length === 0
          && <div className={styles.empty}>No vehicles found</div>
        }

        { !loading && vehicles.length > 0 && (
        <div>
          <div className={styles.wrapperCards}>
            { vehicles.map((vehicle) => (
              <Card title={vehicle.name} color={vehicle.color} key={`${vehicle.name}-${vehicle.id}`}>
                <p>Price: {vehicle.price}</p>
                <p>Description: {vehicle.description}</p>
                <p>Year: {vehicle.year}</p>
                <p>Color: {vehicle.color}</p>
              </Card>
            ))}
          </div>
        </div>
        )}
      </main>
    </div>
  );
};

export default VehiclesPage;
