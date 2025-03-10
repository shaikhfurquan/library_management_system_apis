import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/user.model.js";
import BookModel from "../models/book.model.js";


export const addBook = catchAsyncError(async (req, res, next) => {
    const { title, author, description, price, quantity } = req.body

    if (!title || !author || !description || !price || !quantity) {
        return next(new ErrorHandler("All fields are required", 400))
    }

    const book = await BookModel.create({
        title,
        description,
        author,
        price,
        quantity
    })
    res.status(200).json({
        success: true,
        message: "Book added successfully",
        book
    })
});


export const getAllBooks = catchAsyncError(async (req, res, next) => {
    const books = await BookModel.find({})
    if (!books) {
        return next(new ErrorHandler("Books not found", 400))
    }
    res.status(200).json({
        success: true,
        bookCounts: books.length,
        books
    })

});


export const deleteBook = catchAsyncError(async (req, res, next) => {
    const book = await BookModel.findById(req.params.bookId)
    if (!book) {
        return next(new ErrorHandler("Book with this id not found", 400))
    }
    await BookModel.findByIdAndDelete(req.params.bookId)
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
    })
});
