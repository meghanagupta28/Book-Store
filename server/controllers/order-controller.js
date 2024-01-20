import { AppError } from '../errors/AppError.js';
import { asyncErrorHandler } from '../helper/async-error-handler.js'
import Order from '../models/order-model.js';


export const getOrdersAll = asyncErrorHandler(async(req, res)=>{
    const orders = res.locals.orders;

    const finalOrders = orders.populate('address').exec().populate('items.bookId', 'title author discountedPrice ');

    if(!finalOrders){
        throw new Error();
    }

    delete res.locals.orders;

    res.status(200).json(finalOrders);
})

export const addOrderNew = asyncErrorHandler(async(req, res)=>{
    const { userId } = req.params;
    
    const {
        items,
        address,
        status
    }  = req.body;

    const newOrder = new Order({
        userId: userId,
        items: items,
        address: address,
        status: status
    });

    const savedOrder = await newOrder.save();

    if(!savedOrder){
        throw new AppError(500, 'Order placing failed');
    }

    res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        savedOrder
    })

})

export const getOrderbyOrderId = asyncErrorHandler(async(req,res)=>{
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if(!order){
        throw new Error();
    }

    res.status(200).json(order);
})
