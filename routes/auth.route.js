import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';


const authRouter = express.Router();

authRouter.post('/register', authController.registerUser)
authRouter.post('/verify-otp', authController.verifyOtp)
authRouter.post('/login', authController.loginUser)
authRouter.get('/logout', isAuthenticated, authController.logoutUser)
authRouter.get('/profile', isAuthenticated, authController.getUserProfile)
authRouter.post('/password/forgot', authController.forgotPassword)

export default authRouter