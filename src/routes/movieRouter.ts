import {Router} from "express";
import {body,query} from "express-validator";
const router = Router();
const moviesController = require('../controllers/movies-controller')
const authMiddleware = require('../middleware/auth-middleware')


router.get('/:id', authMiddleware, moviesController.getMovie);
router.get('/', [
        query('sort').custom(sort => {
            if (sort){

                if(sort !== 'id' && sort !== 'title' && sort !== 'year'){
                    return Promise.reject('Not valid sort');
                }
            }
            return true;
        }),
        query('order').custom(async order => {
            if (order){
                if(order !== 'ASC' && order !== 'DESC'){
                    return Promise.reject('Not valid order');
                }
            }
            return true;
        }),
        query('limit').optional().isNumeric(),
        query('offset').optional().isNumeric(),
    ],
    authMiddleware, moviesController.getAllMovies);
router.post('/',
    [
        body('title').trim().isLength({min: 2, max: 24}),
        body('year').custom(async year => {
            if(isNaN(year)){
                return Promise.reject('Not valid year');
            }
            if (!(year > 1850 && year < 2022)){
                return Promise.reject('Not valid year');
            }
            return true;
        }),
        body('format').custom(async format => {
            if (format !== 'VHS' && format !== 'DVD' && format !== 'Blu-Ray'){
                return Promise.reject('You should choose one of: VHS, DVD, Blu-Ray');
            }
            return true;
        }),
        body('actors').isArray({min: 1})
    ],
    authMiddleware, moviesController.create);
router.delete('/:id', authMiddleware, moviesController.delete);
router.patch('/:id',
    [
        body('title').trim().isLength({min: 2, max: 24}),
        body('year').custom(async year => {
            if(isNaN(year)){
                return Promise.reject('Not valid year');
            }
            if (!(year > 1850 && year < 2022)){
                return Promise.reject('Not valid year');
            }
            return true;
        }),
        body('format').custom(async format => {
            if (format !== 'VHS' && format !== 'DVD' && format !== 'Blu-Ray'){
                return Promise.reject('You should choose one of: VHS, DVD, Blu-Ray');
            }
            return true;
        }),
        body('actors').isArray({min: 1})
    ]
    ,authMiddleware,  moviesController.update);
router.post('/import', authMiddleware, moviesController.import)
module.exports = router
