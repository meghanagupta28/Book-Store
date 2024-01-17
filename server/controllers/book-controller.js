import Book from '../models/book-model'


export const getAllBook = async(req, res)=>{
    try {
        const books = await Book.find();
        res.status(200).json({
            books
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving the books'
        })
    }
}