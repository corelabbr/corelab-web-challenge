import React, { useState } from "react";
import styles from "./Edit.module.scss";
import { Input, Select } from "../index";
import { updateVehicle } from "../../lib/api";
import { colors } from "../../utils/selectUtil";

const Edit = ({ setRefresh, onClose, vehicle }) => {
  const [brand, setBrand] = useState(vehicle.brand);
  const [name, setName] = useState(vehicle.name);
  const [description, setDescription] = useState(vehicle.description);
  const [plate, setPlate] = useState(vehicle.plate);
  const [year, setYear] = useState(vehicle.year);
  const [color, setColor] = useState(vehicle.color);
  const [price, setPrice] = useState(vehicle.price);

  const updateV = () => {
    const body = {
      id: vehicle.id,
      brand,
      name,
      description,
      plate,
      year,
      color,
      price,
    };
    return updateVehicle(body)
      .then((res) => {
        if (res) {
          setRefresh(true);
          alert(`${name} atualizado!`);
        } else {
          alert(`${name} não atualizado!`);
        }
      })
      .catch((err) => alert(`${name} não atualizado!`));
  };
  return (
    <div className={styles.Edit}>
      <div className={styles.divBack}>
        <button className={styles.buttonBack} onClick={onClose}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      <div className={styles.content}>
        <Input
          label="Marca:"
          type="text"
          placeholder="Marca"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <Input
          label="Nome:"
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select
          label="Cor"
          onSelect={(e) => setColor(e.target.value)}
          values={colors}
        />
        <Input
          label="Ano:"
          type="number"
          placeholder="Ano"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <Input
          label="Placa:"
          type="text"
          placeholder="Placa"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <Input
          label="Preço:"
          type="number"
          placeholder="Ano"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Descrição:"
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.divButton}>
        <button className={styles.button} onClick={updateV}>
          <span className={styles.text}>Salvar</span>
        </button>
      </div>
    </div>
  );
};

export default Edit;
