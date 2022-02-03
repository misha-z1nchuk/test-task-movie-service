import {NextFunction} from "express";
import {Users} from "../model/users-model";
const ApiError = require('../exeptions/api-error');
const jwt = require('jsonwebtoken');
declare namespace Express {
    interface Request {
        user: {};
    }
}
module.exports = async function (req :any, res: Response, next: NextFunction){
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader){
            return next(ApiError.BadRequest("FORMAT_ERROR", {"token": "REQUIRED"}));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.BadRequest("FORMAT_ERROR", {"token": "REQUIRED"}));
        }

        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        if (!userData){
            return next(ApiError.BadRequest("FORMAT_ERROR", {"token": "REQUIRED"}));
        }

        const user: Users| null = await Users.findOne({where: {id: userData.id}});
        if(!user){
            return next(ApiError.BadRequest("FORMAT_ERROR", {"token": "REQUIRED"}));
        }

        next();
    }catch (e){
        return next(ApiError.BadRequest("FORMAT_ERROR", {"token": "REQUIRED"}));
    }
}