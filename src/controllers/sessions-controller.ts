import {Request, Response, NextFunction} from "express";
const sessionService = require('../services/session-service')

export class SessionsController{
    async login(req: Request, res: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {email, password} = req.body;
            const token = await sessionService.login(email, password);
            return res.json(token)
        }catch (e){
            next(e)
        }
    }
}

module.exports = new SessionsController();