import React, { useEffect, useState, useRef } from "react";
import styles from "./CriarNota.module.scss";
import { ReactComponent as Fav } from "../../assets/img/favorito.svg";
import { ReactComponent as NoFav } from "../../assets/img/Group 2464.svg";
import axios from "axios";

interface Nota {
  N_Titulo: string;
  N_Notas: string;
  N_Fav: number;
  N_Cor_ID: number;
}

const CriarNota = () => {
  const [titulo, setTitulo] = useState("");
  const [notas, setNotas] = useState("");
  const [fav, setFav] = useState(false);
  const [corId, setCorId] = useState(1);

  const divRef = useRef<HTMLDivElement>(null);
  const [valorInput, setValorInput] = useState("");
  const [valorTextarea, setValorTextarea] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [favorito, setFavorito] = useState(false);

  const criarNota = async () => {
    const data: Nota = {
      N_Titulo: valorInput,
      N_Notas: valorTextarea,
      N_Fav: favorito ? 1 : 0,
      N_Cor_ID: corId,
    };

    try {
      const response = await axios.post("http://localhost:3001/notas", data);
    } catch (error) {
    } finally {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        if (valorTextarea.trim() !== "" && valorInput.trim() !== "") {
          criarNota();

          limparCampos();
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const SinalAoClicarNoFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setFavorito((prevState) => !prevState);
  };

  const limparCampos = () => {
    setValorInput("");
    setValorTextarea("");
    setIsVisible(false);
    setFavorito(false);
  };

  return (
    <>
      <div className={styles.CriarNota} ref={divRef}>
        <div className={styles.conteiner}>
          <input
            type="text"
            placeholder="Título"
            className={styles.title}
            value={valorInput}
            onChange={(e) => setValorInput(e.target.value)}
          />

          <button
            type="button"
            className={styles.fav}
            onClick={SinalAoClicarNoFav}
          >
            {favorito ? <NoFav /> : <Fav />}
          </button>
        </div>
        <textarea
          placeholder="Criar nota..."
          className={styles.criarnota}
          value={valorTextarea}
          onChange={(e) => setValorTextarea(e.target.value)}
        />
      </div>
    </>
  );
};

export default CriarNota;
