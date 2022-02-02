import {Router} from "express";
const router = Router();
const moviesController = require('../controllers/movies-controller')

router.post('/', moviesController.create);

module.exports = router
