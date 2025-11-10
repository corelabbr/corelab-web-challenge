import React, { useEffect, useState, useRef } from "react";
import styles from "./Notas.module.scss";
import { ReactComponent as Fav } from "../../assets/img/favorito.svg";
import { ReactComponent as NoFav } from "../../assets/img/Group 2464.svg";
import { ReactComponent as Color } from "../../assets/img/Group 2442.svg";
import { ReactComponent as Close } from "../../assets/img/Vector.svg";
import { ReactComponent as Edit } from "../../assets/img/Frame 1.svg";
import BotaoComCor from "../Button";
import Cor from "../Colors";
import Notfic from "../Notification";
import axios from "axios";

interface Nota {
  N_ID: number;
  N_Titulo: string;
  N_Notas: string;
  N_Fav: number;
  N_Cor_ID: number;
}

interface C_Cor {
  C_ID: number;
  C_Nome: string;
  C_Cor: string;
}

const Notas = (props: Nota) => {
  const [cores, setCores] = useState<C_Cor | undefined>();

  const divRef = useRef<HTMLDivElement>(null);
  const [valorInput, setValorInput] = useState(props.N_Titulo);
  const [valorTextarea, setValorTextarea] = useState(props.N_Notas);
  const [corEdit, setCorEdit] = useState(props.N_Cor_ID);

  const [divClicavel, setDivClicavel] = useState(false);
  const [mostrarCor, setMostrarCor] = useState(false);
  const [close, setclose] = useState(false);
  const [div, setdiv] = useState(false);
  const [favorito, setFavorito] = useState(props.N_Fav);

  const deletarnotas = async () => {
    try {
      await axios.delete(`http://localhost:3001/notasdelet/${props.N_ID}`);
    } catch (error) {
      console.error("Erro ao obter cores:", error);
    } finally {
      window.location.reload();
    }
  };

  const handleEditarNota = async () => {
    try {
      await axios.put(`http://localhost:3001/notasedit/${props.N_ID}`, {
        N_Titulo: valorInput,
        N_Notas: valorTextarea,
        N_Fav: favorito,
        N_Cor_ID: corEdit,
      });
    } catch (error) {
    } finally {
      window.location.reload();
    }
  };

  const fetchCores = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/cor/${props.N_Cor_ID}`
      );
      setCores(response.data);
    } catch (error) {
      console.error("Erro ao obter cores:", error);
    }
  };

  useEffect(() => {
    if (cores == undefined) {
      fetchCores();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        divRef.current &&
        !divRef.current.contains(event.target as Node) &&
        div
      ) {
        setDivClicavel(false);
        setclose(false);
        setMostrarCor(false);
        setdiv(false);
        handleEditarNota();

        if (valorTextarea.trim() !== "" && valorInput.trim() !== "") {
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
    favorito == 1 ? setFavorito(0) : setFavorito(1);
    setdiv(true);
  };

  const botaoEdit = () => {
    setDivClicavel(!divClicavel);
    setdiv(true);
  };
  const botaoColor = () => {
    setMostrarCor(!mostrarCor);
    setdiv(true);
  };
  const botaoClose = () => {
    setMostrardel(!mostrardel);
    deletarnotas();
  };

  const handleCorSelecionada = (valor: number) => {
    setCorEdit(valor);
  };

  const [mostrardel, setMostrardel] = useState(false);

  return (
    <>
      <div
        className={styles.Nota}
        ref={divRef}
        style={{ background: cores?.C_Cor }}
      >
        <div
          className={styles.legal}
          style={{
            pointerEvents: divClicavel ? "auto" : "none",
          }}
        >
          <div
            className={
              cores?.C_Cor == "#FFF" ? styles.conteiner : styles.conteiner2
            }
          >
            <input
              type="text"
              placeholder={props.N_Titulo}
              className={styles.title}
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
            />
            <button
              type="button"
              className={styles.fav}
              onClick={SinalAoClicarNoFav}
            >
              {favorito == 1 ? <NoFav /> : <Fav />}
            </button>
          </div>
          <textarea
            placeholder={props.N_Notas}
            className={styles.criarnota}
            value={valorTextarea}
            onChange={(e) => setValorTextarea(e.target.value)}
          />
        </div>
        <div className={styles.bar}>
          <div className={styles.subbar}>
            <div className={styles.editB}>
              <BotaoComCor
                imagem={<Edit className={styles.edit} />}
                onClique={botaoEdit}
                divClickable={divClicavel}
              />
            </div>
            <div className={styles.colorB}>
              <BotaoComCor
                imagem={<Color className={styles.color} />}
                onClique={botaoColor}
                divClickable={mostrarCor}
              />
            </div>
            <div className={styles.corselect}>
              {mostrarCor && <Cor onCorSelecionada={handleCorSelecionada} />}{" "}
            </div>
          </div>
          <div className={styles.closeB}>
            <BotaoComCor
              imagem={<Close className={styles.close} />}
              onClique={botaoClose}
              divClickable={mostrardel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notas;
