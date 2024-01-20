import { check } from 'express-validator';

export const validateCartDataRules = () => {
    return [
        check('userId')
            .notEmpty()
            .withMessage('User ID must not be left empty')
            .isMongoId()
            .withMessage('Invalid User ID'),

        check('items')
            .notEmpty()
            .withMessage('Items must not be left empty')
            .isArray()
            .withMessage('Items must be an array of objects'),

        check('items.*.bookId')
            .notEmpty()
            .withMessage('Book ID must not be left empty')
            .isMongoId()
            .withMessage('Invalid Book ID'),

        check('items.*.quantity')
            .notEmpty()
            .withMessage('Quantity must not be left empty')
            .isInt({ min: 1 })
            .withMessage('Quantity must be a positive integer'),

        check('items.*.selectedForOrder')
            .optional()
            .isBoolean()
            .withMessage('Selected for Order must be a boolean value'),
    ];
};
