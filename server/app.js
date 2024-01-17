import express from 'express';
import dotenv from 'dotenv';
// import createHttpError from 'http-errors';
import morgan from 'morgan'

import dbConnect from './config/database.js';

import authRouter from './routes/auth-route.js';
import bookRouter from './routes/book-route.js';
import tagRouter from './routes/tag-route.js';
import cartRouter from './routes/cart-router.js';
import wishlistRouter from './routes/wishlist-route.js';

import errorHandler from './middleware/error-middleware.js'

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(morgan);

app.use('/auth', authRouter);
app.use('/books', bookRouter);
app.use('/tag', tagRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);

app.use(errorHandler);

app.listen(PORT, (req, res)=>{
    console.log(`Server is listening on ${PORT} .....`);
})
