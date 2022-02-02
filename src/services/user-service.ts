const ApiError = require('../exeptions/api-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
import {Users} from "../model";

export class UserService{
    async create(name: string, email: string, password: string, confirmPassword: string){
        if (password !== confirmPassword){
            throw ApiError.BadRequest(`passwords does not match`);
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)
        return await Users.create({name, email, password: hashedPassword});
    }

    static create() {

    }
}

module.exports = new UserService();