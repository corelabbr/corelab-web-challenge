import React, { Dispatch, useState } from 'react'
import './CoolorsTab.scss'

type Props = {
    setColor: React.Dispatch<React.SetStateAction<string>>;
    handleColor: (colorP: string) => void;
}

const CoolorsTab = ({setColor, handleColor}: Props) => {

  const editColor = (colorp: string) => {
    setColor(colorp);
    handleColor(colorp);
  }


  return (
    <div className='tabs'>
        <img src="blue.png" alt="blue coolor" onClick={() => editColor('#BAE2FF')} />
        <img src="Ellipse 2.png" alt="light green coolor" onClick={() => editColor('#B9FFDD')}/>
        <img src="Ellipse 3.png" alt="" onClick={() => editColor('#FFE8AC')}/>
        <img src="Ellipse 4.png" alt="" onClick={() => editColor('#FFCAB9')}/>
        <img src="Ellipse 5.png" alt="" onClick={() => editColor('#F99494')}/>
        <img src="Ellipse 6.png" alt="" onClick={() => editColor('#9DD6FF')}/>
        <img src="Ellipse 7.png" alt="" onClick={() => editColor('#ECA1FF')}/>
        <img src="Ellipse 9.png" alt="" onClick={() => editColor('#DAFF8B')}/>
        <img src="Ellipse 11.png" alt="" onClick={() => editColor('#FFA285')}/>
        <img src="Ellipse 8.png" alt="" onClick={() => editColor('#CDCDCD')}/>
        <img src="Ellipse 10.png" alt="" onClick={() => editColor('#979797')}/>
        <img src="Ellipse 12.png" alt="" onClick={() => editColor('#A99A7C')}/>
    </div>
  )
}

export default CoolorsTab