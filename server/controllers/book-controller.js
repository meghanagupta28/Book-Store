import Book from '../models/book-model.js'
import { asyncErrorHandler } from '../helper/async-error-handler.js'
import { AppError } from '../errors/AppError.js';

export const getBooksAll = asyncErrorHandler(async(req, res)=>{

    const books = await Book.find().populate('tags', 'name').exec();

    if(!books){
        throw new Error();
    }

    if(books.length === 0){
        throw new AppError(200, 'No books are found in the inventory');
    }

    res.status(200).json(books);
})

export const getBookSingle = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params;

    const requiredBook = await Book.findById(id);

    if(!requiredBook){
        throw new AppError(404, 'Book does not exist');
    }

    res.status(200).json(requiredBook);
})

export const addBookNew = asyncErrorHandler(async(req, res)=>{
    const { 
        title,
        author,
        imageURL,
        price,
        discountedPrice,
        publishingDate,
        synopsis,
        isbn,
        tags,
        demographic
    } = req.body;

    const newBook = new Book({
        title: title,
        author: author,
        imageURL: imageURL,
        price: price,
        discountedPrice,
        publishingDate: publishingDate,
        synopsis: synopsis,
        isbn: isbn,
        tags:tags,
        demographic: demographic
    })

    const savedBook = await newBook.save()

    res.status(201).json({
        success: true,
        message: 'Book created successfully',
        savedBook
    })
})

export const updateBook = asyncErrorHandler(async(req, res)=>{

    const { id } = req.params;

    const { 
        title,
        author,
        imageURL,
        price,
        discountedPrice,
        publishingDate,
        synopsis,
        isbn,
        tags,
        demographic
    } = req.body;
    

    const updatedBook = await Book.findByIdAndUpdate(
        id,
        { $set: {
            
            title: title,
            author: author,
            imageURL: imageURL,
            price: price,
            discountedPrice: discountedPrice,
            publishingDate: publishingDate,
            synopsis: synopsis,
            isbn: isbn,
            tags: tags,
            demographic: demographic
        }},
        { new: true, runValidators: true }
    );


    if(!updatedBook){
        throw new AppError(500,true, 'Book update failed')
    }

    res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        updatedBook,
    });
})

export const deleteBook = asyncErrorHandler(async(req, res)=>{

    const { id } = req.params;

    const deletedBook = await Review.findByIdAndDelete(id);

    if (!deletedBook) {
        throw new AppError(404, 'Review not found');
    }
    
    res.status(204).json({
        success: true,
        message: 'Book successfully deleted'
    })
})