import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, FormVehicle, Modal } from '../../components';
import { getMyVehicles, getVehicle, updateVehicle } from '../../lib/api';
import { UserContext } from '../../providers/UserAuthenticate';
import { IVehicle } from '../../types/Vehicle';
import styles from './styles.module.scss';

export const MyVehicles = () => {
  const { token, sigIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [myVehicles, setMyVehicles] = useState<IVehicle[]>([]);
  const [openModalFilter, setOpenModalFilter] = useState<boolean>(false);
  const [vehicleEdit, setVehicleEdit] = useState<IVehicle>({} as IVehicle);

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

  const handleNewCar = (e:ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setVehicleEdit({
      ...vehicleEdit,
      [id]: value,
    });
  };

  const handleEditVehicle = async (id: number) => {
    setVehicleEdit(await getVehicle(id));
    setOpenModalFilter(true);
  };

  const handleEditSaveVehicle = async () => {
    await updateVehicle(vehicleEdit, token);
    setMyVehicles((await getMyVehicles(token)).data);
    setOpenModalFilter(false);
  };

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
              isProprietary
              editFavorite={handleEditVehicle}
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
      <div className={openModalFilter ? '' : styles.hidden}>

        <Modal
          setOpenModal={setOpenModalFilter}
          title="Edit Vehicle"
        >
          <FormVehicle
            handleNewCar={handleNewCar}
            setOpenModalSave={setOpenModalFilter}
            handleSubmitNewCar={handleEditSaveVehicle}
            newVehicle={vehicleEdit}
          />
        </Modal>
      </div>
    </div>
  );
};
