import {Request, Response, NextFunction} from "express";
import {validationResult} from "express-validator";

const moviesService = require('../services/movies-service')
const ApiError = require('../exeptions/api-error')

interface MulterRequest extends Request {
    files: any;
}

export class SessionsController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors: any = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.ValidationError("Validation error", errors))
            }

            const {title, year, format, actors} = req.body;
            let result = await moviesService.create(title, year, format, actors)
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            let result = await moviesService.delete(Number(id));
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            const {title, year, format, actors} = req.body;
            let result = await moviesService.update(Number(id), title, year, format, actors);
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async getMovie(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = req.params;
            let result = await moviesService.getMovie(Number(id));
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async getAllMovies(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors: any = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.ValidationError("Validation error", errors))
            }

            let {actor, title, search, sort, order, limit, offset} = req.query
            let result = await moviesService.getMovieList(actor, title, search, sort, order, Number(limit), Number(offset));
            return res.json(result);
        } catch (e) {
            next(e)
        }
    }

    async import(req: MulterRequest, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {movies} = req.files
            if(!movies){
                return next(ApiError.ValidationError("Validation error", {errors: {movies: "File is no provided"}}))
            }
            if(movies.name.split('.').pop() !== 'txt'){
                return next(ApiError.ValidationError("Validation error", {errors: {movies: "File should be .txt"}}))
            }
            let buffer = movies.data;
            let result = await moviesService.import(buffer.toString('utf8'));
            res.json(result);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new SessionsController();