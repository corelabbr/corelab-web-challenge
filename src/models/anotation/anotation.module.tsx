const mongoose = require("mongoose")

const anotationSchema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    fav: { type: Boolean }
})

module.exports  = mongoose.models.Anotation || mongoose.model('Anotation', anotationSchema)