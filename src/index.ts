require('dotenv').config()
import {Request, Response} from "express";
const express = require('express')
import db from './config/database.config'


db.sync().then(() => {
    console.log("db connected")
})

const PORT = process.env.PORT || 5000;

const app = express()

app.get('/', (req: Request, res: Response ) => {
    res.send("Hello world")
})

app.listen(5000, () => {
    console.log(`Server is running on ${PORT}`)
})