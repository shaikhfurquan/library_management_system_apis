import cron from 'node-cron'
import UserModel from "../models/user.model.js";

// Schedule a cron job to remove unverified accounts every 5 minutes
export const removedUnverifiedAccounts = () => {
    cron.schedule("*/5 * * * *", async () => {  // Runs every 5 minutes
        try {
            // Calculate the date and time 30 minutes ago from now
            const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

            // Delete unverified accounts that were created more than 30 minutes ago
            await UserModel.deleteMany({
                accountVerified: false,                 // Account not verified
                createdAt: { $lt: thirtyMinutesAgo },   // Created over 30 minutes ago
            });
        } catch (error) {
            console.log('Error occurred while removing unverified accounts', error.message);
        }
    });
}
