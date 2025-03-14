import express from 'express';
import * as borrowController from '../controllers/borrow.controller.js';
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';


const borrowRouter = express.Router();

borrowRouter.post('/record-borrow-book/:bookId', isAuthenticated, isAuthorized("Admin"), borrowController.recordBorrowedBook)

borrowRouter.put('/return-borrowed-book/:bookId', isAuthenticated, isAuthorized("Admin"), borrowController.returnBorrowBooks)

borrowRouter.get('/my-borrowed-books', isAuthenticated, borrowController.getMyBorrowedBooksForUser)

borrowRouter.get('/admin-borrowed-books-by-users', isAuthenticated, isAuthorized("Admin"), borrowController.getAdminBorrowedBooksForAdmin)


export default borrowRouter