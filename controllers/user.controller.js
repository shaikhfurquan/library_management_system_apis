import cloudinary from "../config/cloudinary.config.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await UserModel.find({ accountVerified: true })

    res.status(200).json({
        success: true,
        usersCount: users.length,
        users
    });

});


export const registeredNewAdmin = catchAsyncError(async (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Admin avatar is required", 400))
    }

    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return next(new ErrorHandler("Please fill all fields", 400))
    }

    const isRegistered = await UserModel.findOne({ email, accountVerified: true })
    if (isRegistered) {
        return next(new ErrorHandler("User already registered", 400))
    }

    // ✅ Validate password length
    if (password.length < 8 || password.length > 16) {
        return next(new ErrorHandler("Password must be between 8 and 16 characters", 400));
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const { avatar } = req.files
    const allowedFormate = ["image/png", "image/jpeg", "image/webp"]
    if (!allowedFormate.includes(avatar.mimetype)) {
        return next(new ErrorHandler("File formate not supported", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        avatar.tempFilePath, {
        folder: "LIBRARY_MANAGEMENT_SYSTEM_ADMIN_AVATAR"
    }

    )
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(new ErrorHandler("Failed to upload avatar to cloudinary", 400))
    }
    const admin = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        role: "Admin",
        accountVerified: true,
        avatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })
    res.status(200).json({
        success: true,
        message: "Admin registered successfully",
        admin
    })
});



