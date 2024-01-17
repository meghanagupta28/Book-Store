import JWT from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import { AppError } from '../errors/AppError.js';
import User from '../models/user-model.js';

export const verifyUserToken = (req, res, next)=>{
    try {
        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        next();

    } catch (error) {
        console.log(error);
    }
}

export const validateUserDataResult = (req, res, next)=>{

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push( err.msg ));

    next(new AppError(422, true, extractedErrors))
}

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