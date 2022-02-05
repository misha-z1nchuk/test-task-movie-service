import {Router} from "express";
import {body} from "express-validator";
const router = Router();
const sessionsController = require('../controllers/sessions-controller')

router.post('/',
    [
        body('email').isEmail(),
        body('password').trim().isLength({min: 6, max: 24}),

], sessionsController.login);

module.exports = router
