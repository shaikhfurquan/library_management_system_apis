import cron from 'node-cron'
import BorrowModel from "../models/borrow.model.js";
import { sendEmail } from "../utils/sendEmail.js";

// Schedule a cron job to run every 30 minutes
export const notifyUsers = () => {
    cron.schedule("*/30 * * * *", async () => {  // Runs every 30 minutes
        try {
            // Calculate the date and time one day ago from now
            const oneDayAgoDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
            
            // Fetch borrowers who are overdue, haven't returned the book, and haven't been notified yet
            const borrowers = await BorrowModel.find({
                dueDate: { $lt: oneDayAgoDate },  // Overdue by more than a day
                returnDate: false,  
                notified: false  
            });

            // Send email notifications to each borrower
            for (const element of borrowers) {
                if (element.user && element.user.email) {
                    sendEmail({
                        email: element.user.email,
                        subject: "Book Return Reminder",
                        body: `Hello ${element.user.name},\n\nThis is a reminder that the book you borrowed is due for return today. Please return the book as soon as possible.\n\nThanks😊`
                    });

                    // Mark borrower as notified and save the update
                    element.notified = true;
                    await element.save();
                }
            }
        } catch (error) {
            console.log('Error occurred while notifying the users', error.message);
        }
    });
}
