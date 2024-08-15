"use client"

import Image from "next/image"

export default function Navbar() {
  function ProcurarTexto() {
    const barraPesquisa: any = document.getElementById("barraPesquisa")
    const textoProcura: string = barraPesquisa.value

    const todosTitulos: any = document.getElementsByClassName("tituloNota")
    const todosConteudos: any = document.getElementsByClassName("conteudoNota")

    for (let i = 0; i < todosTitulos.length; i++) {
      if (todosTitulos[i].innerHTML.includes(textoProcura)) {
        todosTitulos[i].style.backgroundColor = "#FDFF47"
        todosConteudos[i].scrollIntoView()
      }
    }

    for (let i = 0; i < todosConteudos.length; i++) {
      if (todosConteudos[i].innerHTML.includes(textoProcura)) {
        todosConteudos[i].style.backgroundColor = "#FDFF47"
        todosConteudos[i].scrollIntoView()
      }
    }
  }
  
  return (
    <div className="navbar drop-shadow-md">
      <div className="flex items-center">
        <Image
          src="/logo.png"
          width={50}
          height={50}
          alt="Logo CoreNotes"
          className="ml-5"
        />
        <p className="hidden sm:block">CoreNotes</p>
      </div>
      <div className="flex justify-between border border-slate-300 rounded-lg px-1 drop-shadow sm:w-1/2 max-w-screen-sm h-9">
        <input placeholder="Procure uma nota" className="bg-inherit" id="barraPesquisa" />
        <button className="w-7" onClick={() => { ProcurarTexto() }}>
          <Image 
            src="/icone-pesquisar.png"
            width={15}
            height={15}
            alt="Pesquisar"
          />
        </button>
      </div>
      <button className="sm:px-16 px-6">X</button>
    </div>
  )
}