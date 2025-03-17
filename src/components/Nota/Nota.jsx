import React from "react";


import { Link } from 'react-router-dom'
import {FiStar } from "react-icons/fi"

import "./Nota.css"
export default function Nota() {

  return (
      <section className="sectionNota">

  
      <div className="notas">
      <div className="titulo">
      <h5 className="h5"> Titulo</h5>
      <Link className='icone-x' to={'#favoritos'} >
     <FiStar style={{height:'18px', width:"20px", color:"#455A64"}}/>
     </Link> 
      </div>


           <Link style={{cursor:"pointer"}} to={'/cadastro'} >
     <p className='cria-nota'> Criar nota</p>
        </Link>

    
   
    </div>
    </section>
  )}
