import React, { createContext, useState } from 'react'

export const PopUpContext = createContext()

export const PopUpProvider = ({ children }) => {
  const [showPopUp, setShowPopUp] = useState(false)
  const [messageType, setMessageType] = useState('')
  return (
    <PopUpContext.Provider value={[showPopUp, setShowPopUp, messageType, setMessageType]}>
      {children}
    </PopUpContext.Provider>
  )
}
