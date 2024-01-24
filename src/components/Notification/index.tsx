import React, { useEffect, useState, useRef } from "react";
import styles from "./Notificacao.module.scss";
import { ReactComponent as Fav } from "../../assets/img/favorito.svg";
import { ReactComponent as NoFav } from "../../assets/img/Group 2464.svg";
import { ReactComponent as Close } from "../../assets/img/Vector.svg";
import { ReactComponent as Check } from "../../assets/img/check-svgrepo-com.svg";

import axios from "axios";
import { on } from "events";

interface NotificacaoProps {
  valor: number;
  onCancel: () => void;
}

const Notificacao: React.FC<NotificacaoProps> = ({ valor, onCancel }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        onCancel(); // Chama onCancel quando clicar fora da div
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef, onCancel]);

  const deletarnotas = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/notasdelet/${valor}`
      );
    } catch (error) {
      console.error("Erro ao obter cores:", error);
    } finally {
      window.location.reload();
    }
  };

  return (
    <>
      <div className={styles.CriarNota} ref={divRef}>
        <span>Deseja apagar mesmo a Nota?</span>
        <div className={styles.conteiner}>
          <button className={styles.confirma} onClick={deletarnotas}>
            <Check className={styles.check} />
          </button>
          <button className={styles.recusa} onClick={onCancel}>
            <Close className={styles.close} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Notificacao;
