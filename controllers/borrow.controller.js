import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import UserModel from "../models/user.model.js";
import BookModel from "../models/book.model.js";
import BorrowModel from "../models/borrow.model.js";
import { calculateFine } from "../utils/fineCalculator.js";


export const recordBorrowedBook = catchAsyncError(async (req, res, next) => {
    const { bookId } = req.params
    const { email } = req.body
    const book = await BookModel.findById(bookId)
    if (!book) {
        return next(new ErrorHandler("Book not found", 400))
    }

    // finding the user that are taking that book
    const user = await UserModel.findOne({ email, accountVerified: true })
    if (!user) {
        return next(new ErrorHandler("user not found", 400))
    }
    if (book.quantity === 0) {
        return next(new ErrorHandler("book is not available", 400))
    }

    // check if the book is already being borrowed
    const isAlreadyBorrowed = user.borrowedBooks.find(
        (borrowedBook) => borrowedBook.bookId.toString() === bookId && borrowedBook.returned === false
    )
    if (isAlreadyBorrowed) {
        return next(new ErrorHandler("you have already borrowed this book", 400))
    }

    // if its not borrowed then
    book.quantity -= 1
    user.availability = book.quantity > 0
    await book.save()


    // in users borrowed array adding that book
    user.borrowedBooks.push({
        bookId: book._id,
        bookTitle: book.title,
        borrowedDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)     // 7 days
    });
    await user.save()

    // for borrowed
    await BorrowModel.create({
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        },
        book: book._id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),        // 7 days
        price: book.price
    })

    res.status(200).json({
        success: true,
        message: "Borrowed Book recorded successfully"
    })
})



export const returnBorrowBooks = catchAsyncError(async (req, res, next) => {
    const { bookId } = req.params
    const { email } = req.body
    const book = await BookModel.findById(bookId)
    if (!book) {
        return next(new ErrorHandler("Book not found", 400))
    }

    // finding the user that are returing that book
    const user = await UserModel.findOne({ email, accountVerified: true })
    if (!user) {
        return next(new ErrorHandler("user not found", 400))
    }

    const borrowedBook = user.borrowedBooks.find(
        (borrowedBook) => borrowedBook.bookId.toString() === bookId && borrowedBook.returned === false
    )
    if (!borrowedBook) {
        return next(new ErrorHandler("You have not borrowed this book", 400))
    }

    //if borrowrd book then
    borrowedBook.returned = true
    await user.save()

    // book quantity
    book.quantity += 1
    book.availability = book.quantity >
        await book.save()

    const borrow = await BorrowModel.findOne({
        book: bookId,
        "user.email": email,
        returnDate: null
    })
    if (!borrow) {
        return next(new ErrorHandler("You have not borrow this book", 400))
    }

    // updating the return date
    borrow.returnDate = new Date()

    // calculating the fine due date
    const fine = calculateFine(borrow.dueDate)
    borrow.fine = fine
    await borrow.save()

    const resMessage = fine !== 0
        ? `The book has been returned successfully. The total charges including a fine are ${fine + book.price}`
        : `The book has been returned successfully. The total charges including a fine are ${book.price}`

    res.status(200).json({
        success: true,
        message: resMessage

    });
})

