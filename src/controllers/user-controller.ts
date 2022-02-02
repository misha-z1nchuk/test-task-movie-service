import {Request, Response, NextFunction} from "express";
const UserService = require('../services/user-service')

class UserController{
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {name, email, password, confirmPassword} = req.body;
            let res =await UserService.create(name, email, password, confirmPassword);
            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json()
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();