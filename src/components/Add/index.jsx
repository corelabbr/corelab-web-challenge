import React, { useState } from "react";
import styles from "./Add.module.scss";
import { Input, Select } from "../index";
import { createVehicle } from "../../lib/api";
import { colors } from "../../utils/selectUtil";

const Add = ({ setRefresh, onClose }) => {
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");

  const create = () => {
    const body = {
      brand,
      name,
      description,
      plate,
      year,
      color,
      price,
      isFavorite: false,
    };
    return createVehicle(body)
      .then((res) => {
        if (res) {
          setRefresh(true);
          alert(`${name} criado!`);
        } else {
          alert(`${name} não criado!`);
        }
      })
      .catch((err) => alert(`${name} não criado!`));
  };
  return (
    <div className={styles.Add}>
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
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />
        <Input
          label="Nome:"
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Select
          label="Cor:"
          onSelect={(e) => setColor(e.target.value)}
          values={colors}
        />
        <Input
          label="Ano:"
          type="number"
          placeholder="Ano"
          onChange={(e) => setYear(e.target.value)}
          value={year}
        />
        <Input
          label="Placa:"
          type="text"
          placeholder="Placa"
          onChange={(e) => setPlate(e.target.value)}
          value={plate}
        />
        <Input
          label="Preço:"
          type="number"
          placeholder="Ano"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
        <Input
          label="Descrição:"
          type="text"
          placeholder="Descrição"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className={styles.divButton}>
        <button className={styles.button} onClick={create}>
          <span className={styles.text}>Salvar</span>
        </button>
      </div>
    </div>
  );
};

export default Add;
