import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import todoRoute from '../backend/route/todo.route.js';
import userRoute from '../backend/route/user.route.js';
//Express setup
const app  = express();
dotenv.config();


const PORT = process.env.PORT || 4001;
const DB_URL = process.env.MONGOBD_URI;

//Database connection settings
try {
    await mongoose.connect(DB_URL);
    console.log("Connected to MongoDB");
} catch (error) {
    console.error(error);
}

//Routes
app.use(express.json());
app.use('/todo', todoRoute);
app.use('/user', userRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on Port:${PORT}`)
})