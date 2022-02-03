import {Request, Response, NextFunction} from "express";
const moviesService = require('../services/movies-service')

interface MulterRequest extends Request {
    files: any;
}

export class SessionsController{
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {title, year, format, actors} = req.body;
            let result = await moviesService.create(title, year, format, actors)
            return res.json(result);
        }catch (e){
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = req.params;
            let result =await moviesService.delete(Number(id));
            return res.json(result);
        }catch (e){
            next(e)
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = req.params;
            const {title, year, format, actors} = req.body;
            let result =await moviesService.update(Number(id), title, year, format, actors);
            return res.json(result);
        }catch (e){
            next(e)
        }
    }

    async getMovie(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {id} = req.params;
            let result =await moviesService.getMovie(Number(id));
            return res.json(result);
        }catch (e){
            next(e)
        }
    }

    async getAllMovies(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            let {actor, title, search, sort, order, limit, offset} = req.query
            let result =await moviesService.getMovieList(actor, title, search, sort, order, Number(limit), Number(offset));
            return res.json(result);
        }catch (e){
            next(e)
        }
    }

    async import(req: MulterRequest, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {file} = req.files
            let buffer = file.data;
            let result =await moviesService.import(buffer.toString('utf8'));
            res.json(result);
        }catch (e){
            next(e)
        }
    }
}

module.exports = new SessionsController();