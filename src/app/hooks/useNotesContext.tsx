'use client'
import { useContext } from "react"
import { NoteContext } from "../contexts/NoteContext"


export const useNotesContext = () => {
  return useContext(NoteContext)
}