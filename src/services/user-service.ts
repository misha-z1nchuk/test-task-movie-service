import {UserI} from "../global/types";

const ApiError = require('../exeptions/api-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
import {Users} from "../model";
const UserDto = require('../dtos/user-dto')

export class UserService{
    async create(name: string, email: string, password: string, confirmPassword: string){
        const candidate = await Users.findOne({where: {email}});
        if(candidate){
            throw ApiError.BadRequest(`User with such email is already exists`);

        }
        if (password !== confirmPassword){
            throw ApiError.BadRequest(`passwords does not match`);
        }


        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        const user: Users =  await Users.create({name, email, password: hashedPassword});
        const userDto: UserI = new UserDto(user);
        const token = jwt.sign({...userDto}, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m' });
        return {
            token,
            status: 1
        }
    }

}

module.exports = new UserService();