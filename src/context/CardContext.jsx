import { createContext, useEffect, useState } from "react"
import api from "../api/api";
import { useParams } from "react-router-dom";

export const CardContext = createContext({})
export default function CardProvider({children}) {


    const [data, setData] = useState([]);
    const [busca, setBusca] = useState("");
  async function getTodos() {
    // axios banco de dados
    const response = await api.get("/");
    setData(response.data);
    console.log(response.data);
  }
 
  //importando do banco de dados
  useEffect(() => {
    getTodos();
  }, []);

//busca
const searchLowerCase = busca.toLowerCase();
const dados = data.filter((funcionario) =>
funcionario.titulo.toLowerCase().includes(searchLowerCase)

);



    
    return (
        <CardContext.Provider value={{data, setData,dados,busca,setBusca,getTodos}}>
        {children}
        </CardContext.Provider>
  
  
     )

}