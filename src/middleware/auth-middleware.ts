import {NextFunction} from "express";
import {TOKEN_NOT_VALID} from "../global/errors";
import {Users} from "../model/users-model";
const UserDto = require('../dtos/user-dto')
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
            return next(ApiError.UnauthorizedError([TOKEN_NOT_VALID]));
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizedError([TOKEN_NOT_VALID]));
        }

        const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
        if (!userData){
            return next(ApiError.UnauthorizedError([TOKEN_NOT_VALID]));
        }

        const user: Users| null = await Users.findOne({where: {id: userData.id}});
        if(!user){
            return next(ApiError.UnauthorizedError([TOKEN_NOT_VALID]));
        }

        req.user = new UserDto(user);
        next();
    }catch (e){
        return next(ApiError.UnauthorizedError([TOKEN_NOT_VALID]));
    }
}