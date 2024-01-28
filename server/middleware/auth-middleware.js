import { check } from 'express-validator';
import { AppError } from '../errors/AppError.js';
import User from '../models/user-model.js';
import { asyncErrorHandler } from '../helper/async-error-handler.js';
import { decodeToken, verifyToken } from '../helper/jwt-helper.js';

export const requiresLogIn = asyncErrorHandler(async(req, res, next)=>{
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        throw new AppError(401, true, 'JWT has to be provided in the "Bearer" format');
    }

    const token = authorizationHeader.split(' ')[1];

    const verify = verifyToken(token);
    if(!verify){
        throw new AppError(404, true, 'JWT has to be provided');
    }
    next();
})

export const checkAdmin = asyncErrorHandler(async(req, res, next)=>{
    const { userId } = decodeToken(req.headers.authorization);

    const user = await User.findById(userId);

    if(!user || !user.role || user.role !== 'admin'){
        throw new AppError(403, 'Access denied. Admin privileges required.');
    }
    
    next();
})


export const validateRegistrationDataRules = ()=>{
    return [
        check('name')
        .notEmpty()
        .withMessage("Name must not left empty")
        .isString()
        .isLength({ min: 1 })
        .withMessage("Name must be of at least length 1")
        .isAlpha('en-US', {ignore: "-"})
        .withMessage("Name must not contain anything other than the alphabet"),

        check('password')
        .notEmpty()
        .withMessage("Password must not be left empty")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase:1,
            minNumbers:1,
            minSymbols:1,

        }).withMessage("Please enter the password in the stipulated manner"),

        check('email')
        .notEmpty()
        .withMessage("Email must not be left empty")
        .isEmail()
        .withMessage('Invalid email address')
        .trim()
        .custom(async (value)=>{
            try {
                const user = await User.findOne({ email: value });
          
                if (user) {
                  return Promise.reject('User with the provided email already exists');
                } else {
                  return Promise.resolve();
                }

              } catch (error) {
                return Promise.reject('Error in checking email uniqueness');
              }
        }),

        check('phone')
        .notEmpty()
        .withMessage('Phone field should not be left empty'),

        check('address.address')
        .notEmpty()
        .withMessage('Address field should not be left empty'),

        check('address.city')
        .notEmpty()
        .withMessage('City field should not be left empty'),

        check('address.country')
        .notEmpty()
        .withMessage('Country field should not be left empty'),

        check('address.postalCode')
        .notEmpty()
        .withMessage('Postal Code field should not be left empty')
    ]
}


export const validateLoginDataRules = ()=>{
    return [
        check('password')
        .notEmpty()
        .withMessage('Password should not be left empty'),

        check('email')
        .notEmpty()
        .withMessage('Email should not be left empty')
        .isEmail()
        .withMessage('Invalid email address')
        .trim(),
    ]
}