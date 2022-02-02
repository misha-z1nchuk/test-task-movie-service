import {Router} from "express";
const router =  Router()
const userRouter = require('./userRouter')

router.use('/users', userRouter)

module.exports = router