import {Router} from "express";
const router = Router();
const moviesController = require('../controllers/movies-controller')
const authMiddleware = require('../middleware/auth-middleware')

router.post('/',  authMiddleware,  moviesController.create);
router.delete('/:id',  moviesController.delete);

module.exports = router
