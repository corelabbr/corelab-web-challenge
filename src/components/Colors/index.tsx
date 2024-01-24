import React, { useEffect, useState, useRef } from "react";
import styles from "./Colors.module.scss";
import { ReactComponent as Fav } from "../../assets/img/favorito.svg";
import { ReactComponent as NoFav } from "../../assets/img/Group 2464.svg";

interface CriarNotaProps {
  onCorSelecionada: (valor: number) => void;
}

const CriarNota: React.FC<CriarNotaProps> = ({ onCorSelecionada }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [corSelecionada, setCorSelecionada] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        const selectedColorElement = document.querySelector(
          'input[name="cor"]:checked'
        ) as HTMLInputElement | null;

        if (selectedColorElement) {
          const valorSelecionado = Number(selectedColorElement.value);
          setCorSelecionada(valorSelecionado);
          onCorSelecionada(valorSelecionado);
        } else {
          setCorSelecionada(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCorSelecionada]);

  return (
    <>
      <div className={styles.CriarNota} ref={divRef}>
        <div className={styles.conteiner}>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={2}
            />
            <label
              style={{ "--cor": "#BAE2FF" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={3}
            />
            <label
              style={{ "--cor": "#B9FFDD" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={4}
            />
            <label
              style={{ "--cor": "#FFE8AC" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={5}
            />
            <label
              style={{ "--cor": "#FFCAB9" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={6}
            />
            <label
              style={{ "--cor": "#F99494" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={7}
            />
            <label
              style={{ "--cor": "#9DD6FF" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
        </div>
        <div className={styles.conteiner}>
          {" "}
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={8}
            />
            <label
              style={{ "--cor": "#ECA1FF" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={9}
            />
            <label
              style={{ "--cor": "#DAFF8B" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={10}
            />
            <label
              style={{ "--cor": "#FFA285" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={11}
            />
            <label
              style={{ "--cor": "#CDCDCD" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={12}
            />
            <label
              style={{ "--cor": "#979797" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
          <div>
            <input
              id="teste"
              type="radio"
              name="cor"
              className={styles.colors}
              value={13}
            />
            <label
              style={{ "--cor": "#A99A7C" } as React.CSSProperties}
              htmlFor="teste"
            ></label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CriarNota;
