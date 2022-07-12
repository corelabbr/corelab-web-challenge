import { useEffect, useState } from "react";
import { Button, Search, ModalAddVehicle, CardList } from "../../components";
import { getVehicle } from "../../lib/api";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getVehicle().then((res) => setVehicles(res.data));
  }, []);

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        {modalOpen ? (
          <ModalAddVehicle
            statusModal={modalOpen}
            closeModal={() => setModalOpen(false)}
          />
        ) : (
          ""
        )}
        <div className={styles.Header}>
          <Search
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Button
            text="Add new vehicle"
            onClick={() => {
              setModalOpen(true);
            }}
            destaque={true}
          />
        </div>

        <CardList vehiclesList={vehicles} search={search} />
      </main>
    </div>
  );
};

export default VehiclesPage;
