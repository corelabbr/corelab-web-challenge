import React, { useState } from "react";
import ReactModal from "react-modal";
import { IoOptionsOutline } from "react-icons/io5";
import styles from "./Modal.module.scss";

const optionsBrand = [
  { value: "fiat", label: "Fiat" },
  { value: "ford", label: "Ford" },
];

const Modal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function handleOpenModal() {
    return setModalOpen(true);
  }

  function handleCloseModal() {
    return setModalOpen(false);
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
    },
  };

  return (
    <>
      <button className={styles.button} onClick={handleOpenModal}>
        <IoOptionsOutline size={28} />
      </button>
      <ReactModal isOpen={modalOpen} onRequestClose={handleCloseModal}>
        <button onClick={handleCloseModal}>Close</button>
        Modal
      </ReactModal>
    </>
  );
};

export default Modal;
