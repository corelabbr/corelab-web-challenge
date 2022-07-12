import { useEffect, useState } from "react";

import { Button, Card, Search } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import { filterCarByAttributes } from "../../utils/funcFilterSearch";

import { getVehicles } from "../../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { selectModal, selectVehicle } from "../../redux/store";
import { openAddModal } from "../../redux/modalSlice";
import VehicleModal from "../../components/VehicleModal";
import { addVehicle, getVehiclesStore } from "../../redux/vehiclesSlice";

const VehiclesPage = () => {
  const [search, setSearch] = useState<string>("");

  const { addModalOpen, editModalOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  const { vehicles } = useSelector(selectVehicle);
  const [favoritesVehicles, setFavoritesVehicles] = useState<IVehicle[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      dispatch(
        addVehicle(
          payload.sort((a: any, b: any) => a.created_at < b.created_at)
        )
      );
    };
    fetchVehicles();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getVehiclesStore());
  // }, [addModalOpen, editModalOpen, dispatch]);

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Search placeholder="Search" value={search} setSearch={setSearch} />
        <Button
          text="Adicionar"
          onClick={() => dispatch(openAddModal())}
          add={true}
        />
        {!vehicles.length && (
          <p className={styles.message}>Não há anuncios no momento!</p>
        )}
        {addModalOpen && (
          <VehicleModal text={"Add a new Vehicle"} type={"add"} />
        )}

        {favoritesVehicles.length > 0 && (
          <p className={styles.favorites}>Favoritos</p>
        )}

        {/* TODO:Refactor this*/}
        <div className={styles.wrapper_grid}>
          {favoritesVehicles
            ?.filter((car) => filterCarByAttributes(car, search))
            .map(
              ({ name, price, is_favorite, description, year, color, id }) => (
                <>
                  <Card
                    key={id}
                    type="favorites"
                    is_favorite={is_favorite}
                    id={id}
                    title={name}
                    color={color}
                    setFavoritesVehicles={setFavoritesVehicles}
                    favoritesVehicles={favoritesVehicles}
                  >
                    <p>Price: {price}</p>
                    <p>Description: {description?.slice(0, 20)}...</p>
                    <p>Year: {year}</p>
                  </Card>
                </>
              )
            )}
        </div>

        {vehicles.length > 0 && <p className={styles.ad}>Meus anuncios</p>}

        <div className={styles.wrapper_grid}>
          {vehicles
            ?.filter((car) => filterCarByAttributes(car, search))
            .map(
              ({ name, price, is_favorite, description, year, color, id }) => (
                <>
                  <Card
                    key={id}
                    is_favorite={is_favorite}
                    type="vehicles"
                    id={id}
                    title={name}
                    color={color}
                    setFavoritesVehicles={setFavoritesVehicles}
                    favoritesVehicles={favoritesVehicles}
                  >
                    <p>Price: {price}</p>
                    <p>Description: {description?.slice(0, 20)}...</p>
                    <p>Year: {year}</p>
                  </Card>
                </>
              )
            )}
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
