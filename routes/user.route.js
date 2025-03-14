import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';


const userRouter = express.Router();

userRouter.get('/all-users', isAuthenticated, isAuthorized("Admin"), userController.getAllUsers)
userRouter.post('/add/new-admin', isAuthenticated, isAuthorized("Admin"), userController.registeredNewAdmin)

export default userRouter