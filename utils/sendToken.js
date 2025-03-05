export const sendToken = (user, statusCode, message, res) => {
    try {
        // Generate a JWT token using the user's instance method
        const token = user.generateToken();

        // Set the token in a cookie with expiration time
        res
            .status(statusCode) // Set the HTTP status code
            .cookie("token", token, {
                expires: new Date(
                    Date.now() + (Number(process.env.COOKIE_EXPIRE) || 1) * 24 * 60 * 60 * 1000 // Ensure COOKIE_EXPIRE is a number
                ),
                httpOnly: true
            })
            .json({
                success: true,
                user,
                message,
                token
            });

    } catch (error) {
        res.json({ message: "Failed to send token", error: error.message })
    }
};
