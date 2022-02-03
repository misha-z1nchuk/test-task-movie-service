import {Router} from "express";
const router = Router();
const moviesController = require('../controllers/movies-controller')
const authMiddleware = require('../middleware/auth-middleware')


//TODO: Auth middleware
router.get('/:id',  authMiddleware, moviesController.getMovie);
router.get('/', moviesController.getAllMovies);
router.post('/',  authMiddleware,  moviesController.create);
router.delete('/:id',authMiddleware,  moviesController.delete);
router.patch('/:id', authMiddleware,  moviesController.update);
router.post('/import', moviesController.import)
module.exports = router
