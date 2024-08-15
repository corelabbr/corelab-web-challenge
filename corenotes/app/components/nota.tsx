import Image from "next/image";
import PaletaCores from "./paletaCores";

export interface NotaProps {
  id: number
  titulo: string
  conteudo: string
  favorito: boolean
  cor: string
  criadaEm: string
}

export default function Nota(props: NotaProps) {
  function FavoritarNota() {
    fetch("http://localhost:3000/favoritar?notaId=" + props.id,
      {
        method: "PATCH",
        body: JSON.stringify({
          "favorito": props.favorito == true ? 0 : 1
        }),
        headers: { "Content-Type": "application/json" }
      }
    )
    location.reload()
  }

  return (
    <div className={"bg-[#" + props.cor + "] flex flex-col border border-slate-300 rounded-3xl sm:w-1/4 max-w-screen-sm drop-shadow h-72 p-1 px-4 mb-10 sm:mr-10 min-w-[300px]"} id={"nota" + props.id}>
      <div className="flex justify-between border-b border-black items-center">
        <strong>
          <textarea disabled rows={1} className="flex h-auto w-full bg-inherit py-2 tituloNota resize-none" id={"titulo" + props.id} defaultValue={props.titulo} />
        </strong>
        <Image
          src={props.favorito == true ? "/estrela-amarela.png" : "/estrela-branca.png"}
          width={20}
          height={20}
          alt="Favoritar nota"
          onClick={() => { FavoritarNota() }}
        />
      </div>
      <div className="flex flex-col grow justify-between">

        <textarea disabled rows={7} className="py-2 bg-inherit conteudoNota resize-none" id={"conteudo" + props.id} defaultValue={props.conteudo} />

        <PaletaCores notaId={props.id} />
        <div className="flex justify-between">
          <div>
            <button onClick={() => {
              const tituloNota: any = document.getElementById("titulo" + props.id)
              const conteudoNota: any = document.getElementById("conteudo" + props.id)
              const iconeConcluir: any = document.getElementById("iconeConcluir" + props.id)

              tituloNota.toggleAttribute("disabled")
              conteudoNota.toggleAttribute("disabled")

              if (iconeConcluir.classList[0] == "hidden") {
                iconeConcluir.classList.replace("hidden", "block")
              } else {
                iconeConcluir.classList.replace("block", "hidden")
              }
            }}>
              <Image src="/icone-editar.png" width={20} height={20} alt="Editar" id={"iconeEditar" + props.id} />
            </button>

            <button onClick={() => {
              const tituloNota: any = document.getElementById("titulo" + props.id)
              const conteudoNota: any = document.getElementById("conteudo" + props.id)

              fetch("http://localhost:3000/editar?notaId=" + props.id, 
                {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(
                    {
                      "titulo": tituloNota.value,
                      "conteudo": conteudoNota.value
                    }
                  )
                }
              )
              location.reload()
            }}>
              <Image className="hidden" src="/icone-concluir.png" width={20} height={20} alt="Concluir" id={"iconeConcluir" + props.id} />
            </button>
          </div>

          <button onClick={() => {
            const paleta: any = document.getElementById("paleta" + props.id)
            if (paleta.classList[0] == "hidden") {
              paleta.classList.replace("hidden", "flex")
            } else {
              paleta.classList.replace("flex", "hidden")
            }
          }}>
            <Image src="/icone-cor.png" width={20} height={20} alt="Alterar cor" />
          </button>

          <button onClick={() => {
            if (confirm("Deletar nota?")) {
              fetch("http://localhost:3000/apagar?notaId=" + props.id, {
                method: "DELETE"
              })
            }
            location.reload()
          }}><Image src="/icone-deletar.png" width={20} height={20} alt="Deletar nota" /></button>
        </div>
      </div>
    </div>
  )
}
