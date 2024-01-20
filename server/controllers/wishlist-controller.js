import { AppError } from "../errors/AppError.js";
import { asyncErrorHandler } from "../helper/async-error-handler.js";
import Wishlist from '../models/wishlist-model.js'

export const getWishlist = asyncErrorHandler(async(req, res)=>{
    const { userId } = req.params;

    const wishlist = await Wishlist.find({userId: userId}).populate('books', 'name author price discountedPrice').exec();

    if(!wishlist){
        throw new AppError(500, true, 'Failed to fetch wishlist from the database');
    }

    res.status(200).json(wishlist);
})

export const addToWishlist = asyncErrorHandler(async(req, res)=>{
    const { userId, bookId } = req.params;

    const updatedWishlist  = await Wishlist.findOneAndUpdate({ userId: userId}, {
        $push: { books : bookId }
    }, { runValidators: true, new: true}).populate('books', 'name author price discountedPrice');

    if(!updatedWishlist){
        throw new AppError(500, true, 'Failed to fetch wishlist from the database');
    }

    res.status(201).json({
        success: true,
        message: 'Book added to wishlist successfully',
        updatedWishlist
    })
})

export const deleteFromWishlist = asyncErrorHandler(async(req, res)=>{
    const { userId, bookId } = req.params;
    const updatedWishlist  = await Wishlist.findOneAndUpdate({ userId: userId}, {
        $pull: { books : bookId }
    }, { runValidators: true, new: true}).populate('books', 'name author price discountedPrice');

    if(!updatedWishlist){
        throw new AppError(500, true, 'Failed to fetch wishlist from the database');
    }

    res.status(204).json({
        success: true,
        message: 'Book deleted from wishlist successfully',
        updatedWishlist
    })
})