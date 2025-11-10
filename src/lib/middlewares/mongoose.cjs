const mongoose = require('mongoose')

const DATABASE_URI = 'mongodb+srv://pedroaparecidori:3IqCJy0zfOhuC3Lu@cluster-corelab.7lp2g5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-corelab'

const Connect = async () => {
    try {
        await mongoose.connect(DATABASE_URI)
        console.log('Conectado ao MONGODB')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = Connect