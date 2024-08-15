import { ChangeEvent, useState } from "react";
import "./Menu.scss"

import logo from "../../assents/image 8.png";
import searchn from "../../assents/search.png"
import exit from "../../assents/Vector (1).png"

interface MenuProps {
    onSearchChange: (value: string) => void;
}

export default function Menu ({ onSearchChange }: MenuProps) {


    const [search, setSearch] = useState("");

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearch(newValue);
        onSearchChange(newValue);
    };
    
    return(
        <nav className="allNav">
            <div className="dateNave">
                <div className="NavLogo">
                    <img src={logo} alt="logo" />
                    <p>CoreNotes</p>
                </div>
                <div className="searchNav">
                    <input type="text" placeholder="" onChange={handleTextChange} value={search} />
                    <img src={searchn} alt="pesquisa" />
                </div>
            </div>
            <img className="exit" src={exit} alt="x" onChange={()=>{

            }}/>
        </nav>
    );
};