module.exports = class ApiError extends Error{
    status: any;
    errors: any;

    constructor(status: any, message:string, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(error = []){
        return new ApiError(401, "User not authorized", error);
    }

    static BadRequest(message: string, errors = []){
        return new ApiError(400, message, errors);
    }

}