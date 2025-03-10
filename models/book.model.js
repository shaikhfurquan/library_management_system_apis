import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

const BookModel = mongoose.model('Book', bookSchema)

export default BookModel