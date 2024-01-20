import { check } from 'express-validator';

export const validateTagDataRules = () => {
    return [
        check('name')
            .notEmpty()
            .withMessage('Name must not be left empty')
            .isString()
            .withMessage('Name must be a string')
            .isLength({ min: 1 })
            .withMessage('Name must have at least 1 character')
            .isLowercase()
            .withMessage('Name must be in lowercase')
            .trim(),

        check('description')
            .notEmpty()
            .withMessage('Description must not be left empty')
            .isString()
            .withMessage('Description must be a string')
            .trim(),
    ];
};
