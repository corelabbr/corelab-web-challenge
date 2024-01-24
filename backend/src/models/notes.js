import mongoose from "mongoose"

const NoteSchema = new mongoose.Schema({
    title: { type: String, required: true, maxlength: 100 },
    note: { type: String, required: true, maxlength: 400 },
    isFavorite: { type: Boolean, required: false },
    color: { type: String, required: false }
})

export default mongoose.models.Note || mongoose.model('Note', NoteSchema)