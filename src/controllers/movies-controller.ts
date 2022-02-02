import {Request, Response, NextFunction} from "express";
const moviesService = require('../services/movies-service')

export class SessionsController{
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {title, year, format, actors} = req.body;
            await moviesService.create(title, year, format, actors)
            return res.json("Ok");
        }catch (e){
            next(e)
        }
    }
}

module.exports = new SessionsController();