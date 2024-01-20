import { AppError } from '../errors/AppError.js';
import { asyncErrorHandler } from '../helper/async-error-handler.js'


export const getCart = asyncErrorHandler(async(req, res)=>{
    const { userId } = req.params;

    const cart = Cart.find({ userId: userId}).populate('items.bookId', 'title author price discountedPrice imageURL' ).exec();

    if(!cart){
        throw new AppError(404, 'Not Found');
    }

    res.status(200).json(cart);
})

export const addCartItem = asyncErrorHandler(async(req, res) => {
    const { userId, bookId } = req.params;
    const { quantity } = req.body;

    const newItem = {
        bookId,
        quantity: quantity,
        selectedForOrder: true,
    }

    const updatedCart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $push: { items: newItem } },
        { new: true, runValidators: true }
    );

    if (!updatedCart) {
        throw new AppError(500, 'Error in adding item to the cart');
    }

    res.status(201).json({
        success: true,
        message: 'Item added to cart successfully',
        cart: updatedCart
    });
});

export const deleteCartItem = asyncErrorHandler(async(req, res) => {
    const { userId, bookId } = req.params;

    const updatedCart = await Cart.findOneAndUpdate(
        { userId: userId },
        { $pull: { items: { bookId } } },
        { new: true }
    );

    if (!updatedCart) {
        throw new AppError(500, 'Item could not be deleted');
    }

    res.status(204).json({
        success: true,
        message: 'Item deleted from the cart successfully',
        cart: updatedCart
    });
});