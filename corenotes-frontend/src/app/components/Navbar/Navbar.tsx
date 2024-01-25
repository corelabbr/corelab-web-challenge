import Image from "next/image";
import React from "react";
import Logo from "./logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./styles.module.scss";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <Image src={Logo} alt="Todos logo" className={styles.logo_image} quality={100} width={30} />
        <p>CoreNotes</p>
      </div>
      <div className={styles.searchbar_container}>
        <Searchbar />
      </div>
      <div className={styles.x_icon_container}>
        <FontAwesomeIcon icon={faXmark} className={styles.x_icon} />
      </div>
    </div>
  );
}
