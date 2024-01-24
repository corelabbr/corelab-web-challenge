import databaseConnection from "../utils/database"
import Note from "../models/notes"

export const listerNotes = async () => {
    await databaseConnection()
    const notes = await Note.find()
    return notes
}

export const createNote = async (note) => {
    await databaseConnection()
    const createdNote = await Note.create(note)
    return createdNote
}

export const deleteNote = async (id) => {
    await databaseConnection()
    await Note.findByIdAndDelete(id)
}

export const updateNote = async (id, newBody) => {
    await databaseConnection()
    try {
      const updatedNote = await Note.findByIdAndUpdate(id, newBody, { new: true })
      return updatedNote
    } catch (error) {
      console.error('Erro ao atualizar a nota:', error)
      throw error
    }
  }