import React, { useContext }  from 'react'
import { Link } from 'react-router-dom'
import "./Hearder.css"
import Simbolo from "../../assets/imageHeader.png"
import Nome from "../../assets/Group 2430.png"
import { IoClose } from "react-icons/io5";
import Search from '../Search/Search'
import { CardContext } from '../../context/CardContext'

export default function Hearder() {

  const {busca,setBusca}=useContext(CardContext)
// menu

    return (
    <header>
      <div className='container'>
      <img src={Simbolo} alt='logo'/>
      <img src={Nome} alt='nome'/>
     
      </div>
 <div className='buscar'>

 <Search busca={busca} setBusca={setBusca}/>
      <Link to={'/'} >   
<IoClose
className='Ioclose'
/>

</Link>
 

</div>
   
     



     
    </header>
  )
}
