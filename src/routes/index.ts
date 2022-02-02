import {Router} from "express";
const router =  Router()
const userRouter = require('./userRouter')
const sessionRouter = require('./sessionRouter')

router.use('/users', userRouter)
router.use('/sessions', sessionRouter)

module.exports = router