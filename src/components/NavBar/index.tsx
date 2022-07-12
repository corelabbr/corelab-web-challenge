import React, { useState } from "react";
import Search from "../Search";
import './style.css'

 const NavBar = () => {

    return (
        <nav className="navbar-vehicles">
            <h1 className="vehicles-navbartitle">CoreLabsVehicles</h1>
            <Search placeholder="Search" />
        </nav>
        
    )
}

export default NavBar;