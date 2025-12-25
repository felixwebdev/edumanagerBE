import User from "../model/User.js";
import AppError from "../utils/AppError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "mysecretkey";

class UserService {
    async register(username, password, userId, role = "hocsinh") {
        if (!username || !password || !userId)
            throw new AppError("All fields are required");

        const isExistUser = await User.exists({ username: username });
        if (isExistUser) throw new AppError("Username has been used");

        const newUser = await User.create({ username, password, role, userId });
        const accessToken = jwt.sign(
            { id: newUser._id, username: newUser.username, role: newUser.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        newUser.save();

        return {
            accessToken,
        };
    }

    async login(username, password) {
        if (!username || !password)
            throw new AppError("All fields are request");

        const user = await User.findOne({ username: username });
        if (!user) throw new AppError("User not found");

        const isValid = await user.comparePassword(password);
        if (!isValid) throw new AppError("username or Password is invalid");

        const accessToken = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        return {
            accessToken,
            role: user.role,
            fullname: user.fullname,
        };
    }

    async getUserById(id) {
        return await User.findById(id);
    }
}

export default new UserService();
