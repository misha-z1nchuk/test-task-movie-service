require('dotenv').config()
import {Request, Response, NextFunction} from "express";
const UserService = require('../services/user-service')

class UserController{
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {name, email, password, confirmPassword} = req.body;
            let token  = await UserService.create(name, email, password, confirmPassword);
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();