import React from 'react'
import './NavBar.module.scss'
import { memo } from 'react'

import { FaLinkedin, FaGithubSquare, FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate()

  const handleNavigate = ():void => {
    navigate('/')
  }


  return (
        <>
              <nav >
                    <h3 onClick={handleNavigate}>MyBookCar <FaCar/></h3>
                   <ul>
                      <li ><a href="https://www.linkedin.com/in/silassousadejesus/" ><FaLinkedin /></a></li>
                      <li><a href="https://github.com/SilasSousadeJesus"><FaGithubSquare/></a></li>
                   </ul>
              </nav> 
        </>
  )
}

export  const NavBar = memo(Header)