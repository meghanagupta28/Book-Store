import { AppError } from "../errors/AppError.js";

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