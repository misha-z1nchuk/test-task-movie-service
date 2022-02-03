require('dotenv').config()
const express = require('express')
import db from './config/database.config'
const router = require('./routes/index')
const errorMiddleware = require('./middleware/error-middleware')
const fileUpload = require('express-fileupload')

db.sync().then(() => {
    console.log("db connected")
})

const PORT = process.env.APP_PORT || 5000;

const app = express()
app.use(express.json())
app.use(fileUpload({}))
app.use('/api/v1', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})