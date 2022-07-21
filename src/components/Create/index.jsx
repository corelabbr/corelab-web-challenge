import { useEffect, useState } from "react";
import FormCreate from "../FormCreate";
import api from "../../service/api";
import ModalCar from "../ModalCar";
import Header from "../Header";
import "./style.css";

export default function Create() {
  const [openForm, setOpenForm] = useState(false);
  const [cars, setCars] = useState([]);

  async function loadCars() {
    try {
      const { data } = await api.get("/vhs");

      setCars([...data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadCars();
  }, []);
  return (
    <>
      {openForm && <FormCreate setOpenForm={setOpenForm} />}
      <div className="container-layout">
        <section className="container">
          <section className="sideA logo"></section>
          <section className="sideB">
            {<Header setOpenForm={setOpenForm} />}
            <h3 className="title">Meus Favoritos</h3>
            <div className="favorites"></div>

            <h3 className="title">Meus Anúncios</h3>

            <div className="my-car-announces">
              {cars.map((car) => (
                <ModalCar key={car.id} {...car} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </>
  );
}
