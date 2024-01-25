import React from "react";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  return (
    <div className={styles.container}>
      <h3>Carregando Notas...</h3>
      <FontAwesomeIcon icon={faSpinner} spinPulse className={styles.icon} />
    </div>
  );
}
