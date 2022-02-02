require('dotenv').config()
const express = require('express')
import db from './config/database.config'
const router = require('./routes/index')
const errorMiddleware = require('./middleware/error-middleware')

db.sync().then(() => {
    console.log("db connected")
})

const PORT = process.env.PORT || 5000;

const app = express()
app.use(express.json())
app.use('/api/v1', router)
app.use(errorMiddleware)

app.listen(5000, () => {
    console.log(`Server is running on ${PORT}`)
})