import React, { useEffect, useState, ReactNode } from "react";
import styles from "./Botao.module.scss";

interface BotaoComCorProps {
  imagem: ReactNode;
  onClique: () => void;
  divClickable?: Boolean;
  [x: string]: any;
}

const BotaoComCor: React.FC<BotaoComCorProps> = ({
  imagem,
  onClique,
  divClickable = false,
  ...rest
}) => {
  const [backgroundAtivo, setBackgroundAtivo] = useState(false);

  const handleBotaoClick = () => {
    setBackgroundAtivo(!backgroundAtivo);
    onClique();
  };

  useEffect(() => {
    if (backgroundAtivo && !divClickable) {
      setBackgroundAtivo(false);
    }
  }, [backgroundAtivo, divClickable]);

  return (
    <button
      type="button"
      className={`${styles.botao} ${backgroundAtivo ? styles.ativo : ""}`}
      onClick={handleBotaoClick}
      {...rest}
    >
      {imagem}
    </button>
  );
};

export default BotaoComCor;
