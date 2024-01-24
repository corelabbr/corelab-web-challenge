import { Router } from "express"

import { listerNotes, createNote, deleteNote, updateNote } from "../services/notes"

const router = Router()

router.get('/', async (req, res) => {
    const noteList = await listerNotes()
    res.send(noteList)
})

router.post('/', async (req, res) => {
    try {
        const note = await createNote(req.body)
        res.status(201).send(note)
    } catch (err) {
        res.status(400).send()
    }
})

router.delete('/:noteId', async (req, res) => {
    await deleteNote(req.params.noteId)
    res.send('delete')
})

router.put('/:noteId', async (req, res) => {
    await updateNote(req.params.noteId, req.body)
    res.send('update')
})

export default router