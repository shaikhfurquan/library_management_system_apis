import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import { isAuthenticated, isAuthorized } from '../middlewares/authMiddleware.js';


const bookRouter = express.Router();

bookRouter.post("/admin/add", isAuthenticated, isAuthorized("Admin"), bookController.addBook)
bookRouter.get("/all", isAuthenticated, bookController.getAllBooks)
bookRouter.delete("/admin/:bookId", isAuthenticated, isAuthorized("Admin"), bookController.deleteBook)
// bookRouter.put("/admin/:bookId", isAuthenticated, isAuthorized("Admin"), bookController.updateBook)

export default bookRouter