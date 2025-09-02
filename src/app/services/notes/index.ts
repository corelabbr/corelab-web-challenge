import { createNote } from './create'
import { deleteNote } from './delete'
import { getAllNotes } from './get-all'
import { partialUpdateNote } from './partial-update'
import { updateNote } from './update'

export const NotesService = {
  getAll: getAllNotes,
  create: createNote,
  delete: deleteNote,
  partialUpdate: partialUpdateNote,
  update: updateNote,
}
