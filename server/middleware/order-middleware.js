import { AppError } from '../errors/AppError.js';
import { asyncErrorHandler } from '../helper/async-error-handler.js'

import Order from '../models/order-model.js'


export const getOrdersByUserId = asyncErrorHandler(async(req, res, next)=>{
    const { userId } = req.params;

    const order = Order.find({ userId : userId }).exec();

    if(!order){
        throw new AppError(500, 'Could not obtain orders');
    }

    res.locals.orders = order;
    next();
})

import { check } from 'express-validator';

export const validateOrderDataRules = () => {
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
            .withMessage('Items must be an array of orderItem objects'),

        check('items.*.bookId')
            .notEmpty()
            .withMessage('Book ID in items must not be left empty')
            .isMongoId()
            .withMessage('Invalid Book ID in items'),

        check('items.*.quantity')
            .notEmpty()
            .withMessage('Quantity in items must not be left empty')
            .isNumeric()
            .withMessage('Quantity in items must be a numeric value'),

        check('address')
            .notEmpty()
            .withMessage('Address must not be left empty')
            .isMongoId()
            .withMessage('Invalid Address ID'),

        check('status')
            .notEmpty()
            .withMessage('Status must not be left empty')
            .isIn(['Order Placed', 'Order Cancelled', 'Shipped', 'Out for Delivery', 'Delivered'])
            .withMessage('Invalid status value. It should be one of: Order Placed, Order Cancelled, Shipped, Out for Delivery, Delivered'),
    ];
};
