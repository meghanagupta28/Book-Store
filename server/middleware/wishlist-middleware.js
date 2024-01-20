import { check } from 'express-validator';

export const validateWishlistDataRules = () => {
    return [
        check('userId')
            .notEmpty()
            .withMessage('User ID must not be left empty'),

        check('books')
            .optional()
            .isArray()
            .withMessage('Books must be an array of Book ObjectIds'),
    ];
};
