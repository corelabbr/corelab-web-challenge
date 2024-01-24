import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config()

const URI = process.env.MONGODB_URI

const databaseConnection = async () => {

    if (!global.mongoose) {
        mongoose.set('strictQuery', false)
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection