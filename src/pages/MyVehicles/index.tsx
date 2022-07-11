import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components';
import { getMyVehicles } from '../../lib/api';
import { UserContext } from '../../providers/UserAuthenticate';
import { IVehicle } from '../../types/Vehicle';
import styles from './styles.module.scss';

export const MyVehicles = () => {
  const { token, sigIn, user } = useContext(UserContext);
  const navigate = useNavigate();
  const [myVehicles, setMyVehicles] = useState<IVehicle[]>([]);

  useEffect(() => {
    const login = async () => {
      await sigIn();
      if (token) {
        const response = await getMyVehicles(token);
        setMyVehicles(response.data);
      } else {
        navigate('/login');
      }
    };

    login();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header>
          <h1>My Vehicles</h1>
        </header>

        <div className={styles.wrapperCards}>
          { myVehicles.map((vehicle) => (
            <Card
              title={vehicle.name}
              color={vehicle.color}
              key={`${vehicle.name}-${vehicle.id}`}
              idVehicle={vehicle.id}
              isProprietary={vehicle.user.id === user.id}
            >
              <p>Brand: {vehicle.brand}</p>
              <p>Price: {vehicle.price}</p>
              <p>Description: {vehicle.description}</p>
              <p>Year: {vehicle.year}</p>
              <p>Color: {vehicle.color}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
