'use client'

import { useEffect, useState } from "react";
import NovaNota from "./components/novaNota";
import Nota from "./components/nota";

export interface NotaObject {
  id: number
  titulo: string
  conteudo: string
  favorito: boolean
  cor: string
  criadaEm: string
}

export default function Home() {
  const [notas, setNotas] = useState<Array<NotaObject>>([])

  useEffect(() => {
    fetch("http://localhost:3000/todas")
      .then((response => response.json()))
      .then((data) => {
        setNotas(data)
      })
  }, [])

  return (
    <main className="p-5 mx-6">
      <div className="flex justify-center">
        <NovaNota />
      </div>

      <div>
        <h1 className="ml-2 mt-10 mb-2">Favoritas</h1>
        <div className="flex flex-wrap">
          {
            notas.map((nota): any => {
              if (nota.favorito == true) {
                return (
                  <Nota key={nota.id} id={nota.id} titulo={nota.titulo} conteudo={nota.conteudo} favorito={nota.favorito} cor={nota.cor} criadaEm={nota.criadaEm} />
                )
              }
            })
          }
        </div>
      </div>
      <div>
        <h1 className="ml-2 mb-2">Outras</h1>
        <div className="flex flex-wrap">
          {
            notas.map((nota): any => {
              if (nota.favorito == false) {
                return (
                  <Nota key={nota.id} id={nota.id} titulo={nota.titulo} conteudo={nota.conteudo} favorito={nota.favorito} cor={nota.cor} criadaEm={nota.criadaEm} />
                )
              }
            })
          }
        </div>
      </div>
    </main>
  );
}
