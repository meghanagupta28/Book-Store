import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/database.js'
import authRouter from './routes/auth-route.js';


dotenv.config()

const app = express();

const PORT = process.env.PORT || 8080;

dbConnect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);

app.listen(PORT, (req, res)=>{
    console.log(`Server is listening on ${PORT} .....`);
})
