import User from "../model/user.model.js";

import {z} from "zod";
const userSchema = z.object({
    email:z.string().email({message:'invalid email'}),
    username:z.string().min(3,{message:'username must be at least 3 characters long'}),
    username:z.string().min(6,{message:'username must be at least 6 characters long'}),
})

export const register = async (request, response) => {
    console.log("signup function called");
    try {
        const { username, email, password } = await request.body;
        // console.log('User details',username, email, password);

        // check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return response.status(400).json({ message: "User already exists" });
        }
        // create new user
        const newUser = new User({ username, email, password });
        await newUser.save();
        if (newUser) {
            response.status(201).json({ message: "User created successfully", newUser });
        }
    } catch (error) {
        console.log("Error Occured", error);
        response.status(500).json({ message: "Error Occured", error });
    }
};

export const login = (request, response) => {
    console.log("Login function called");
    try {
    } catch (error) {
        console.log("Error Occured", error);
        response.status(500).json({ message: "Error Occured", error });
    }
};

export const logout = (request, response) => {
    console.log("Logout function called");
    try {
    } catch (error) {
        console.log("Error Occured", error);
        response.status(500).json({ message: "Error Occured", error });
    }
};
