import {Router} from "express";
const router = Router();
const userController = require('../controllers/user-controller')
import {body} from "express-validator";


router.post('/',
    [
        body('name').trim().isLength({min: 2, max: 24}),
        body('email').isEmail(),
        body('password').trim().isLength({min: 6, max: 24}),
        body('confirmPassword').trim().isLength({min: 6, max: 24}),
    ]
    ,userController.create);

module.exports = router
