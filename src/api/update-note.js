import { useParams } from "react-router-dom";
import api from "./api";
import { useState } from "react";




export async function updateNote() {
  const {id}=useParams();
      const [values, setValues] = useState({
        titulo: "",
        descricao: "",
      }); 
  const response = await api.put(`/`+ id, values)
    .catch((error) => {
      console.error("Erro ao atualizar nota:", error);
      throw error;
    });
  return response.data;
}
