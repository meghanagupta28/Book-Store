import express from 'express';
import dotenv from 'dotenv';

import dbConnect from './config/database.js';

import authRouter from './routes/auth-route.js';
import bookRouter from './routes/book-route.js';
import tagRouter from './routes/tag-route.js';
import cartRouter from './routes/cart-router.js';
import wishlistRouter from './routes/wishlist-route.js';
import orderRouter from './routes/order-route.js'
import errorHandler from './middleware/error-middleware.js'
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/tag', tagRouter);
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/wishlist', wishlistRouter);

app.use(errorHandler);

app.listen(PORT, (req, res)=>{
    console.log(`Server is listening on ${PORT} .....`);
})
