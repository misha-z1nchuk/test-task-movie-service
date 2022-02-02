import {Router} from "express";
const router = Router();
const sessionsController = require('../controllers/sessions-controller')

router.post('/', sessionsController.login);

module.exports = router
