import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

connectDB();

const app=express();

app.use(express.json()) // receive data
app.use(express.urlencoded({extended: true})) // send data
app.use(cookieParser())

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);

app.get('/',(req,res)=>{
    res.send("Backend running fine")
})

app.use(notFound)
app.use(errorHandler)


// npm run server or // npm run dev (to run both frontend and backend)
const port=process.env.PORT || 5000;
app.listen(port,()=>{console.log(`backend running on port ${port}`)})












/*

-**POST  /api/users **- Register a user
-**POST  /api/users/auth **- Authenticate a user and get token
-**POST  /api/users/logout **- Logout a user and clear cookie
-**GET   /api/users/profile **- Get user profile
-**PUT   /api/users/profile **- Updadte Profile

*/