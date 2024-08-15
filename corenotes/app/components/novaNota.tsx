import Image from "next/image";
import { useState } from "react";

export default function NovaNota() {
  const [favorito, setFavorito] = useState(0)
  
  return (
    <div className="bg-white border border-slate-300 rounded-3xl sm:w-1/2 max-w-screen-sm drop-shadow h-50 p-1 px-4">
      <div className="flex justify-between border-b-2">
        <input type="text" placeholder="Título" className="w-full" id="novaNotaTitulo" />
        <Image
          src={favorito == 1 ? "/estrela-amarela.png" : "/estrela-branca.png"}
          width={20}
          height={20}
          alt="Favoritar nota"
          onClick={() => {
            if (favorito == 0) {
              setFavorito(1)
            } else {
              setFavorito(0)
            }
          }}
        />
      </div>
      <div className="flex flex-col justify-between grow">
        <textarea rows={3} placeholder="Criar nota..." className="w-full my-2 resize-none" id="novaNotaConteudo" />
        <div className="flex justify-between">
          <Image
            src="/icone-concluir.png"
            width={20}
            height={20}
            alt="Criar nota"
            onClick={() => {
              const novaNotaTitulo: any = document.getElementById("novaNotaTitulo")
              const novaNotaConteudo: any = document.getElementById("novaNotaConteudo")

              fetch("http://localhost:3000/criar",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    "titulo": novaNotaTitulo.value,
                    "conteudo": novaNotaConteudo.value,
                    "favorito": favorito
                  })
                }
              )
              location.reload()
            }}
          />
          <Image
            src="/icone-deletar.png"
            width={20}
            height={20}
            alt="Deletar nota"
            onClick={() => {
              const novaNotaTitulo: any = document.getElementById("novaNotaTitulo")
              const novaNotaConteudo: any = document.getElementById("novaNotaConteudo")

              novaNotaTitulo.value = ""
              novaNotaConteudo.value = ""
            }}
          />
        </div>
      </div>
    </div>
  )
}