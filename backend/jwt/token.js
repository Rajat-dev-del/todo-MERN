import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
export const genrateTokenAndSaveInCookies = async (userId, response) => {
    console.log("genrateTokenAndSaveInCookies called", userId);
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn: '10d'
        // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
    })
    response.cookie("jwt",token,{
        httpOnly: true,
        secure: false,
        sameSite: 'lax', // Forces the cookie to be sent only over HTTPS
        path:"/"
    })
    console.log("genrateToken: ", token);
    await User.findByIdAndUpdate(userId,{token})
    return token;
}