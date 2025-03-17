import React, { useContext, useState } from "react";
import { FavoritosContext } from "../../context/FavoritosContext";
import { FiStar } from "react-icons/fi";
import "../Card/Card.css";
import { Link } from "react-router-dom";
import { FaBook, FaPencil } from "react-icons/fa6";
import { IoMdColorFill } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Modal from "../Modal/Modal";
import api from "../../api/api";
import { CardContext } from "../../context/CardContext";
import { ColorContext } from "../../context/ColorContext";
import { colorOptions } from "../../utils/Color";

function Card({ item, isFavorite }) {
  const { toggleFavorite } = useContext(FavoritosContext);
  const { getTodos } = useContext(CardContext);
  const [openModal, setOpenModal] = useState(false);
  const { changeColor, selectedItem, setSelectedItem } =
    useContext(ColorContext);

  // Função que abre a modal
  function abrirModal() {
    setOpenModal(true);
  }

  // Função que fecha a modal
  function fecharModal() {
    setOpenModal(false);
  }

  // deletar
  async function handleDelete(data) {
    await api.delete(`/${data.id}`);
    getTodos();
    alert("Tarefa deletada com sucesso");
    fecharModal();
  }
  return (
    <>
      <div className="superior">
        {item.titulo}
        <figure
          onClick={() => toggleFavorite(item.id)}
          style={{ cursor: "pointer" }}
        >
          {isFavorite ? "⭐" : <FiStar />}
        </figure>
      </div>

      <p className="nota"> {item.descricao}</p>

      <div className="inferior">
        <div>
          <Link to={`/${item.id}`}>
            <FaBook
              color="black"
              size={17}
              cursor="pointer"
              className="icone"
              onClick={abrirModal}
            />
          </Link>

          <Link to={`/edit/${item.id}`}>
            <FaPencil
              style={{
                fontSize: 20,
                color: "black",
                margin: " 0 10px 0 10px",
              }}
            />
          </Link>

          <IoMdColorFill
            onClick={() =>
              setSelectedItem(selectedItem === item.id ? null : item.id)
            }
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: 20,
            }}
          />
        </div>
        <IoClose
          style={{ fontSize: 25, color: "black", cursor: "pointer" }}
          onClick={abrirModal}
        />
        <Modal isOpen={openModal} isClose={fecharModal}>
          <h2>Olá</h2>
          <span style={{ padding: " 10px 0" }}>
            Tem certeza que deseja deletar essa Tarefa?
            <strong> {item.titulo}</strong>
          </span>
          <div>
            <button onClick={fecharModal} className="btn">
              Cancelar
            </button>
            <button onClick={() => handleDelete(item)} className="btn-del">
              Deletar
            </button>
          </div>
        </Modal>
      </div>

      <div className="itemColor">
        {selectedItem === item.id && (
          <div className="colores">
            {colorOptions.map((color) => (
              <button
                key={color}
                className="colorOptions"
                style={{ backgroundColor: color }}
                onClick={() => changeColor(item.id, color)}
              />
            ))}
          </div>
        )}
      </div>

      {/* </div> */}
    </>
  );
}

export default Card;
