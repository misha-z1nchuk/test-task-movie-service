module.exports = class ApiError extends Error{
    status: number;
    errors: {};
    codeMessage: string;

    constructor(status: number, codeMessage:string, errors = {}) {
        super();
        this.codeMessage = codeMessage;
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(error = []){
        return new ApiError(401, "User not authorized", error);
    }

    static BadRequest(codeMessage: string, errors = {}){
        return new ApiError(0, codeMessage, {fields: errors});
    }

    static ValidationError(codeMessage: string, errors : any){
        return new ApiError(0, codeMessage, errors['errors']);
    }
}

export const AUTHENTICATION_FAILED ={
    "fields": {
        "email": "AUTHENTICATION_FAILED",
        "password": "AUTHENTICATION_FAILED"
    },
    "code": "AUTHENTICATION_FAILED"
}