import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import {
  Button,
  Card,
  Search,
  Header,
  CriarNota,
  Notas,
  Colors,
  Notfic,
} from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";
import axios from "axios";

interface Nota {
  N_ID: number;
  N_Titulo: string;
  N_Notas: string;
  N_Fav: number;
  N_Cor_ID: number;
}

const VehiclesPage = () => {
  const [notasfav, setfavNotas] = useState<Nota[]>([]);
  const [notasnofav, setnofavNotas] = useState<Nota[]>([]);

  useEffect(() => {
    const fetchfavNotas = async () => {
      try {
        const response = await axios.get<Nota[]>(
          "http://localhost:3001/notasfav"
        );
        setfavNotas(response.data);
      } catch (error) {
        console.error("Erro ao obter notas:", error);
      }
    };

    fetchfavNotas();

    const fetchnofavNotas = async () => {
      try {
        const response = await axios.get<Nota[]>(
          "http://localhost:3001/notasnofav"
        );
        setnofavNotas(response.data);
      } catch (error) {
        console.error("Erro ao obter notas:", error);
      }
    };

    fetchnofavNotas();
  }, []);
  const [mostrarCor, setMostrarCor] = useState(false);
  const handleCorSelecionada = (valor: number) => {};

  return (
    <>
      <Header />
      <div className={styles.Vehicles}>
        <div className={styles.container}>
          <CriarNota />
        </div>
        <div className={styles.fav}>
          <div className={styles.subfav}>
            <span className={styles.favspan}>Favoritas</span>
            <div className={styles.notasdefav}>
              {notasfav.map((value) => {
                return (
                  <Notas
                    key={value.N_ID}
                    N_ID={value.N_ID}
                    N_Cor_ID={value.N_Cor_ID}
                    N_Fav={value.N_Fav}
                    N_Notas={value.N_Notas}
                    N_Titulo={value.N_Titulo}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.fav}>
          <div className={styles.subfav}>
            <span className={styles.favspan}>Outras</span>
            <div className={styles.notasdefav}>
              {notasnofav.map((value) => {
                return (
                  <Notas
                    key={value.N_ID}
                    N_ID={value.N_ID}
                    N_Cor_ID={value.N_Cor_ID}
                    N_Fav={value.N_Fav}
                    N_Notas={value.N_Notas}
                    N_Titulo={value.N_Titulo}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehiclesPage;
