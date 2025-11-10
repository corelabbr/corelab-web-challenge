const { Insert, Get, Patch, Del } = require('../../models/anotation/index.cjs')

const Connect = require('../../lib/middlewares/mongoose.cjs')

const express = require('express')

const mongoose = require('mongoose')

const router = express()

const bodyParser = require('body-parser')
const upload = require('multer')
const cors = require('cors')

const con = Connect()

const DATABASE_URI = 'mongodb+srv://pedroaparecidori:3IqCJy0zfOhuC3Lu@cluster-corelab.7lp2g5f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-corelab'

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/get', async (req, res) => {
    try {
        const response = await Get()
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send('error in get')
    }
})

router.patch('/patch/:id', async (req, res) => {
    try {
        const response = await Patch(req.body)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send('error in patch')
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await Del(req.params.id)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send('error in delete')
    }
})

router.post('/post', async (req, res) => {
    try {
        const response = await Insert(req.body)
        res.status(201).send(response)
    } catch (err) {
        res.status(500).send('error in post')
    }
})

router.listen(3003, 'localhost').on('Connect', async () => {
    console.log(process.env.DATABASE_URI)
    try {
        await mongoose.connect(DATABASE_URI)
        console.log('Conectado ao MONGODB')
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})