import { createContext, useContext, useEffect, useState } from "react"
import { CardContext } from "./CardContext";



export const ColorContext = createContext({})
export default function ColorProvider({children}) {


const [colors, setColors] = useState("#fffff");
const [selectedItem, setSelectedItem] = useState(null);
//  const { getTodos } = useContext(CardContext);
// Carrega as cores salvas no localStorage ao iniciar
useEffect(() => {

  const savedColors = JSON.parse(localStorage.getItem("colors")) || {};
  setColors(savedColors);
}, []);

// Atualiza a cor de um item específico
const changeColor = (itemId, color) => {
  const updatedColors = { ...colors, [itemId]: color };
  setColors(updatedColors);
  localStorage.setItem("colors", JSON.stringify(updatedColors));
  setSelectedItem(null); // Fecha o seletor de cor
};
 





    
    return (
        <ColorContext.Provider value={{changeColor,selectedItem,colors,setSelectedItem}}>
        {children}
        </ColorContext.Provider>
  
  
     )

}