import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import { Button, Card, Search } from "../../components";
import styles from "./createVehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import Form from "../../components/Form";

const CreateVehicle = () => {
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
    <div className={styles.Container}>
      <div className={styles.Box}>
        <Form />
      </div>
    </div>
  );
};

export default CreateVehicle;
