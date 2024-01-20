import { AppError } from '../errors/AppError.js';
import { asyncErrorHandler } from '../helper/async-error-handler.js'
import Review from '../models/review-model.js';

import { check } from 'express-validator';

export const validateReviewDataRules = () => {
    return [
        check('userId')
            .notEmpty()
            .withMessage('User ID must not be left empty')
            .isMongoId()
            .withMessage('Invalid User ID'),

        check('bookId')
            .notEmpty()
            .withMessage('Book ID must not be left empty')
            .isMongoId()
            .withMessage('Invalid Book ID'),

        check('rating')
            .optional()
            .isDecimal({ decimal_digits: '1,1' })
            .withMessage('Invalid rating. It should be a decimal with one decimal place'),

        check('comment')
            .optional()
            .isString()
            .withMessage('Comment must be a string')
            .isLength({ max: 200 })
            .withMessage('Comment cannot exceed 200 characters'),
    ];
};
