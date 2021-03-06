import {NextFunction, Response} from "express";
const ApiError = require("../exeptions/api-error")

module.exports = function (err: any, req: Request, res: Response, next: NextFunction){
    if (err instanceof ApiError){
        return res.status(200).json({status: err.status, errors: err.errors, code: err.codeMessage})
    }
    console.log(err)
    return res.status(500).json({message: "Unexpected error"})
}