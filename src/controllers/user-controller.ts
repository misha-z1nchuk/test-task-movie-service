import {validationResult} from "express-validator";

require('dotenv').config()
import {Request, Response, NextFunction} from "express";
const  ApiError =  require("../exeptions/api-error");
const UserService = require('../services/user-service')

class UserController{
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const errors: any = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.ValidationError("Validation error", errors))
            }

            const {name, email, password, confirmPassword} = req.body;
            let token  = await UserService.create(name, email, password, confirmPassword);
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();