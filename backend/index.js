import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import todoRoute from '../backend/route/todo.route.js';
import userRoute from '../backend/route/user.route.js';
//Express setup
const app  = express();
dotenv.config();


const PORT = process.env.PORT || 4002;
const DB_URL = process.env.MONGOBD_URI;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URI, 
    credentials:true,
    method:"GET,POST,PUT,DELETE",
    allowedHeaders:['Content-Type', 'Authorization']  // allow specific headers in request
}));

//Database connection settings
try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error(error);
}

//Routes
app.use('/todo', todoRoute);
app.use('/user', userRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`)
})