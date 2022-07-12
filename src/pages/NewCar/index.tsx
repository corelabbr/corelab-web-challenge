import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { api } from "../../lib/api";
import styles from "./NewCar.module.scss";
import { ICar } from "../../types/Car";

interface IBrand {
  created_at: Date;
  id: number;
  name: string;
  updated_at: Date;
}

const NewCar = () => {
  const [brandList, setBrandList]: Array<IBrand> | any = useState();

  useEffect(() => {
    api
      .get("/brand")
      .then((response: any) => {
        setBrandList(response.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(brandList);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICar>();

  const newCar = handleSubmit((data: ICar) =>
    api
      .post("/cars", data)
      .then(() => console.log(data))
      .catch((err) => console.log(err))
  );

  return (
    <main>
      <Link className={styles.emoji} to="/">
        ←
      </Link>
      <form onSubmit={newCar} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="name">Name:</label>
          <input type="text" {...register("name")} id="name" />
        </div>
        <div className={styles.input}>
          <label htmlFor="brand">Marca:</label>
          <select id="brand" {...register("brand_id")}>
            {brandList?.map((item: IBrand) => (
              <option key={item.name} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.input}>
          <label htmlFor="color">Cor:</label>
          <input type="text" {...register("color")} id="color" />
        </div>
        <div className={styles.input}>
          <label htmlFor="year">Ano:</label>
          <input
            type="number"
            {...register("year", { maxLength: 4 })}
            id="year"
          />
        </div>
        <div className={styles.input}>
          <label htmlFor="km">Km:</label>
          <input type="number" {...register("km")} id="km" />
        </div>
        <div className={styles.input}>
          <label htmlFor="price">Preço:</label>
          <input type="number" {...register("price")} id="price" />
        </div>
        <div className={styles.input}>
          <label htmlFor="licensePlate">Placa:</label>
          <input type="text" {...register("license_plate")} id="licensePlate" />
        </div>
        <div className={styles.input}>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            cols={30}
            rows={10}
            {...register("description")}
          ></textarea>
        </div>
        <input type="submit" value="salvar" />
      </form>
    </main>
  );
};

export default NewCar;
