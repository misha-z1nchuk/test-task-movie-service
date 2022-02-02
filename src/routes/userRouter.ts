import {Router} from "express";
const router = Router();
const userController = require('../controllers/user-controller')

router.post('/', userController.create);

module.exports = router
