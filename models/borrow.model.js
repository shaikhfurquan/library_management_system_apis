import mongoose from 'mongoose';

const borrowSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
    },
    price: {
        type: Number,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    borrowDate: {
        type: Date,
        default: Date.now
    },
    returnDate: {
        type: Date,
        default: null
    },
    dueDate: {
        type: Date,
        required: true
    },
    fine: {
        type: Number,
        default: 0
    },
    notified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const BorrowModel = mongoose.model('Borrow', borrowSchema)

export default BorrowModel