import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { IoClose } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";

import api from "../../api/api";
import "./Card.css";

import { ColorContext } from "../../context/ColorContext";
import { FiStar } from "react-icons/fi";

export default function LerCard() {
  const { id } = useParams();
  const [item, setTarefa] = useState([]);
  const { colors } = useContext(ColorContext);

  useEffect(() => {
    api
      .get("/" + id)
      .then((res) => {
        console.log(res);
        setTarefa(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="titulos">
        <h1>Detalhe Tarefa</h1>

        <div
          className="favorito-tarefa"
          style={{ height: "220px", backgroundColor: colors[item.id] }}
        >
          <div className="superior">
            <h5> {item.titulo}</h5>

            {<FiStar />}
          </div>

          <p className="nota" style={{ height: "120px" }}>
            {" "}
            {item.descricao}
          </p>

          <div className="inferior">
            <Link to={`/edit/${item.id}`}>
              <FaPencil
                style={{ height: "22px", width: "22px", color: "#51646E" }}
              />
            </Link>
            <Link className="icone-x" to={"/"}>
              <IoClose
                style={{ height: "20px", width: "20px", color: "#51646E" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
