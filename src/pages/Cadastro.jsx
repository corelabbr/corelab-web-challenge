import React, { useContext, useEffect, useState } from "react";

import "../components/Card/Card.css";

import { IoClose } from "react-icons/io5";
import { RiSave3Fill } from "react-icons/ri";


import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../api/api";
import { Head } from "../components/Head/Head";
import { ColorContext } from "../context/ColorContext";
import { IoMdColorFill } from "react-icons/io";
import { colorOptions } from "../utils/Color";


export default function Cadastrar() {
    const { id } = useParams();
  const { changeColor, selectedItem,colors, setSelectedItem } =
    useContext(ColorContext);
    const navigate = useNavigate();

  useEffect(() => {
    // puxando dados do banco
    //  banco de dados
    api.get("/" + id).then((res) => {
      console.log(res);

      setValues(res.data[0]);
    });
  }, []);

  const [values, setValues] = useState({
    titulo: "",
    descricao: "",
    favorite: false 
     });
  async function SaveTarefa() {
    try {
      const response =
        id > 0 ? await api.put(`/` + id, values) : await api.post("/", values);

      if (response.data) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      alert("Tarefa já cadastrada");
    }
  }

  //  busca
  return (
    <div className="titulos"
    
    >
      <Head title={id > 0 ? "Editar tarefa" : "Cadastrar Tarefa"} />

      <h1>{id > 0 ? "Editar tarefa" : "Cadastrar Tarefa"}</h1>

   
        <div
          className="favorito-tarefa"
          style={{ backgroundColor: colors[id]}}>
            
          <form className="login-fomr">
            <div
              className="superior"
           
            >
              <label htmlFor="">Titulo:</label>
              <input
                className="input-padrao"
                type="text"
                value={values.titulo}
                onChange={(e) =>
                  setValues({ ...values, titulo: e.target.value })
                }
                placeholder="Digite um titulo"
                required
                style={{ backgroundColor: colors[id]}}
              />
                    </div>
            {/* <div className="nota"> */}

            <textarea
              className="textarea"
              type="text"
              value={values.descricao}
              onChange={(e) =>
                setValues({ ...values, descricao: e.target.value })
              }
              placeholder="Digite uma Tarefa"
              required
              style={{ backgroundColor: colors[id]}}
                        />

            <div className="inferior">
             <IoMdColorFill
                    onClick={() =>
                      setSelectedItem(selectedItem === id ? null : id)
                    }
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontSize: 20,
                    }}
                  />
        
                  
          <div>

         

<Link className="icone-x" to={"/"}>
                <IoClose
                  style={{ height: "30px", width: "30px", color: "#51646E" }}
                />
              </Link>

            

              <button className="button" type="button" onClick={SaveTarefa}>
                <RiSave3Fill
                  style={{ height: "35px", width: "35px", color: "blue" }}
                />
                
              </button>
              </div>
              </div>
              <div className="itemColor">
                      {selectedItem === id && (
                        <div className="colores">
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              className="colorOptions"
                              style={{ backgroundColor: color }}
                              onClick={() => changeColor(id, color)}
                            />
                          ))}
                        </div>
                      )}
                    </div>
          </form>
        </div>
      </div>
   
  );
}
