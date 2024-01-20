import { AppError } from '../errors/AppError.js';
import { asyncErrorHandler } from '../helper/async-error-handler.js'
import Review from '../models/review-model.js';


export const getReviewsAll = asyncErrorHandler(async(req, res)=>{
    const { bookId } = req.params;

    const reviews = await Review.find({ bookId: bookId }).exec();

    if(!reviews){
        throw new AppError(500, 'Retrieval of reviews failed')
    }

    res.status(200).json(reviews);
})

export const addReviewNew = asyncErrorHandler(async(req, res)=>{
    const { userId, bookId } = req.params;

    const { rating, comment } = req.body;

    const newReview = new Review({
        userId:userId,
        bookId:bookId,
        rating:rating,
        comment: comment
    })

    const savedReview = await newReview.save();

    if(!savedReview){
        throw new AppError(500, 'Failed to save review');
    }

    res.status(201).json({
        success: true,
        message: 'Review added successfully',
        savedReview
    })
})

export const updateReview = asyncErrorHandler(async(req, res)=>{
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { rating, comment },
        { new: true, runValidators: true }
    );


    if(!updatedReview){
        throw new AppError(500, true, 'Review update failed');
    }

    res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        updateReview
    })
})

export const deleteReview = asyncErrorHandler(async (req, res) => {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        throw new AppError(404, 'Review not found');
    }

    res.status(204).json({
        success: true,
        message: 'Review deleted successfully',
    });
});