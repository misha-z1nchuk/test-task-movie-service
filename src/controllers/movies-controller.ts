import {Request, Response, NextFunction} from "express";
const moviesService = require('../services/movies-service')

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
}

module.exports = new SessionsController();