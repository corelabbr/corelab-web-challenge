import React from "react";
import styles from "../../assets/styles/components/header.module.sass";
import { IoMdClose } from "react-icons/io";
import {FaRegUserCircle} from 'react-icons/fa'
import iconMenu from "@/assets/images/iconCoreLab.png";
import searchIcon from "@/assets/images/svg/search.svg";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.container}>
      <ul>
        <li>
          <Image src={iconMenu} alt="icon menu" />
          Core notes
          <input type="text" placeholder="Pesquisar notas" />
          <Image
            className={styles.imgSearch}
            src={searchIcon}
            alt="search icon"
          />
        </li>

        <li><FaRegUserCircle size={30}/><IoMdClose/></li>
      </ul>
    </header>
  );
};

export default Header;
