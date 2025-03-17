import React from 'react'
import { BsSearch } from 'react-icons/bs'
import "./Search.css"
export default function Search({busca,setBusca}) {
  return (
    <div className="busca">
    {/* filtro */}
    <input
name="input"
      type="texts"
     value={busca}
     onChange={(e) => setBusca(e.target.value)}
      className="pesquisa"
      placeholder="Pesquise aqui"

    />

    <div className="lupa">
      <BsSearch size={12} />
    </div>

    </div>
  )
}
