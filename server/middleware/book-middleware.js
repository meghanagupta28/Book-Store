import { AppError } from "../errors/AppError.js";
// import { asyncErrorHandler } from "../helper/async-error-handler.js";
import Tag from '../models/tag-model.js'
import { check } from 'express-validator'

export const validateBookDataRules = () => {
    return [
        check('title')
            .notEmpty()
            .withMessage('Title must not be left empty'),

        check('author')
            .notEmpty()
            .withMessage('Author must not be left empty'),

        check('imageURL')
            .optional()
            .isURL()
            .withMessage('Invalid URL for imageURL'),

        check('price')
            .notEmpty()
            .withMessage('Price must not be left empty')
            .isNumeric()
            .withMessage('Price must be a numeric value'),

        check('discountedPrice')
            .notEmpty()
            .withMessage('Discounted Price must not be left empty')
            .isNumeric()
            .withMessage('Discounted Price must be a numeric value'),

        check('publishingDate')
            .notEmpty()
            .withMessage('Publishing Date must not be left empty')
            .isISO8601()
            .toDate()
            .withMessage('Invalid ISO8601 date format for publishingDate'),

        check('synopsis')
            .notEmpty()
            .withMessage('Synopsis must not be left empty'),

        check('isbn')
            .notEmpty()
            .withMessage('ISBN must not be left empty'),

        check('tags')
            .notEmpty()
            .withMessage('Tags must not be left empty')
            .isArray()
            .withMessage('Tags must be an array of Tag ObjectIds')
            .custom(async (tags) => {
                const existingTags = await Tag.find({ _id: { $in: tags } });

                if (existingTags.length !== tags.length) {
                    throw new AppError(404, true, 'Invalid tag IDs in the tags array');
                }
            }),

        check('demographic')
            .notEmpty()
            .withMessage('Demographic must not be left empty')
            .isIn(['18+', 'Kids', 'Teens'])
            .withMessage('Invalid demographic value. It should be one of: 18+, Kids, Teens'),
    ];
};