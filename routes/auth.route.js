import express from 'express';
import * as authController from '../controllers/auth.controller.js';


const authRouter = express.Router();

authRouter.post('/register', authController.registerUser)
authRouter.post('/verify-otp', authController.verifyOtp)

export default authRouter