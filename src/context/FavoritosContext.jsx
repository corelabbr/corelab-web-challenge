import { createContext, useContext, useEffect, useState } from "react"
import { CardContext } from "./CardContext";

export const FavoritosContext=createContext()
export default function FavoritosProvider({children}) {

const [favorites, setFavorites] = useState({});
    const {dados }=useContext(CardContext) 
// Carrega os favoritos do localStorage ao iniciar
useEffect(() => {
  const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
  setFavorites(savedFavorites);
}, []);

// Alterna o estado de favorito para um item específico
const toggleFavorite = (itemId) => {

  const updatedFavorites = {
    ...favorites,
    [itemId]: !favorites[itemId]
  };

  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Separar os itens favoritos dos não favoritos
const favoriteItems = dados.filter((item) => favorites[item.id]);
const regularItems = dados.filter((item) => !favorites[item.id]);





    return (
        <FavoritosContext.Provider value={{favoriteItems,regularItems,toggleFavorite}}>
        {children}
        </FavoritosContext.Provider>
  
  
     )

}