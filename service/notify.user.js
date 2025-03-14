import cron from 'node-cron'
import BorrowModel from "../models/borrow.model.js";
import { sendEmail } from "../utils/sendEmail.js";


export const notifyUsers = () => {
    cron.schedule("*/30 * * * *", async () => {        // 30-min
        try {
            const oneDayAgoDate = new Date(Date.now() - 24 * 60 * 60 * 1000)
            const borrowers = await BorrowModel.find({
                dueDate: { $lt: oneDayAgoDate },
                returnDate: false,
                notified: false
            })

            for (const element of borrowers) {
                if (element.user && element.user.email) {
                    sendEmail({
                        email: element.user.email,
                        subject: "Book Return Reminder",
                        body: `Hello ${element.user.name} , \n\nThis is a reminder that the book you borrowed due for return today. Please return the book as soon as possible.\n\nThanks😊`
                    })
                    element.notified = true
                    await element.save()
                }

            }
        } catch (error) {
            console.log('Error occured while notifying the users', error.message);
        }
    })
}