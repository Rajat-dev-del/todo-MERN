import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

import {z} from "zod";
import { genrateTokenAndSaveInCookies } from "../jwt/token.js";
const userSchema = z.object({
    email:z.string().email({message:'invalid email'}),
    username:z.string().min(3,{message:'username must be at least 3 characters long'}),
    password:z.string().min(6,{message:'password must be at least 6 characters long'}),
})

export const register = async (request, response) => {
    try {
        const { username, email, password } = await request.body;
        //validation error
        if(!username || !email || !password){
            return response.status(400).json({ message: "All fields are required" });
        }
        const validation = userSchema.safeParse({ username, email, password });
        if(!validation.success){
            const errorMessage = validation.error.errors.map(error => error.message);
            return response.status(400).json({ message: errorMessage }); 
        }
        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return response.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password,10);
        // create new user
        const newUser = new User({ username, email, password:hashPassword });
        await newUser.save();
        if (newUser) {
            const token = await genrateTokenAndSaveInCookies(newUser._id,response);
            console.log(token);
            response.status(201).json({ message: "User created successfully", newUser, token });
        }
    } catch (error) {
        response.status(500).json({ message: "Error Occured", error });
    }
};

export const login = async(request, response) => {
    const {email, password} = request.body;
    try {
        if(!email || !password){
            return response.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({email}).select("+password");
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!user || !checkPassword){
            return response.status(400).json({message:"invalid email or password"})
        }
        const token = await genrateTokenAndSaveInCookies(user._id,response);

        response.status(200).json({ message:"User login successfully",user});
    } catch (error) {
        response.status(500).json({ message: "Error Occured", error });
    }
};

export const logout = async (request, response) => {
    try {
        response.clearCookie("jwt",{
            path:"/"
        })
        response.status(200).json({ message:"User logged out successfully" });
    } catch (error) {
        response.status(500).json({ message: "Error Occured", error });
    }
};
