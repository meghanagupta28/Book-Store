import { AppError } from "../errors/AppError.js";
import { validationResult } from "express-validator";

const errorHandler = (error, req, res, next)=>{
    
    console.error(error);

    let statusCode = 500;
    let message = 'Internal Server Error';

    if(error instanceof AppError){
        statusCode = error.statusCode;
        message = error.message;
    }

    res.status(statusCode).json({
        status: statusCode,
        message: message,
    });
}

export default errorHandler;

export const checkValidationResult = (req, res, next)=>{

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push( err.msg ));

    next(new AppError(422, true, extractedErrors))
}