import React from 'react'
import "./Modal.css"


export default function Modal({isOpen,isClose,children}) {

        
    if(isOpen){
    return (
        <div className='background'>   
      <div className='modals' >
        <div className='x' onClick={isClose}>X</div>
<div className='text-modal'>
{children}

</div>

      </div>
         </div>
  

    
  )
  }
  return null
}
