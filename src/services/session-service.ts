import {Users} from "../model/users-model";
const  ApiError = require("../exeptions/api-error");
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const jwt = require('jsonwebtoken')


export class SessionService{
    async login(email: string, password: string){
        const candidate : Users | null = await Users.findOne({where: {email}});
        if(!candidate){
            throw ApiError.BadRequest("AUTHENTICATION_FAILED",
                {
                    "email": "AUTHENTICATION_FAILED",
                    "password": "AUTHENTICATION_FAILED"
                });
        }
        const issPassEquals = await bcrypt.compare(password, candidate.password)
        if (!issPassEquals){
            throw ApiError.BadRequest("AUTHENTICATION_FAILED",
                {
                    "email": "AUTHENTICATION_FAILED",
                    "password": "AUTHENTICATION_FAILED"
                });
        }
        const userDto = new UserDto(candidate);
        const token = jwt.sign({...userDto}, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m' });

        return{
            token,
            status: 1,
        }


    }
}
module.exports = new SessionService();