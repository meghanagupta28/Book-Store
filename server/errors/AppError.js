export class AppError extends Error{
    constructor(statusCode, isOperational, description){
        super(description)

        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = statusCode;
        this.isOperational = isOperational
        Error.captureStackTrace(this, this.constructor)
    }
}