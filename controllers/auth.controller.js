import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendVerificationCode } from "../utils/sendVerificationCode.js";


export const registerUser = catchAsyncError(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check if all required fields are provided
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please enter all fields", 400));
        }

        // ✅ Check if user is already registered (with verified account)
        const isRegistered = await UserModel.exists({ email, accountVerificatied: false });
        if (isRegistered) {
            return next(new ErrorHandler("User already registered", 400));
        }

        // ✅ Limit registration attempts
        const registrationAttemptByUser = await UserModel.find({
            email,
            accountVerificatied: false,
        })
        if (registrationAttemptByUser >= 5) {
            return next(new ErrorHandler("Too many registration attempts. Please try again later", 400))
        }

        // ✅ Validate password length
        if (password.length < 8 || password.length > 16) {
            return next(new ErrorHandler("Password must be between 8 and 16 characters", 400));
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create user & generate verification code in parallel
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const verificationCode = user.generateVerificationCode();
        await user.save(); // Save user/verification code

        // ✅ Send verification email asynchronously (doesn’t block response)
        sendVerificationCode(verificationCode, email, res);

        // // ✅ Respond to client
        // res.json({ message: "user registered successfully", email: user.email, name: user.name });

    } catch (error) {
        next(error);
    }
});
