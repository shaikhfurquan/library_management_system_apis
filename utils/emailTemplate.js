export const generateVerificationOtpEmailTemplate = (otpCode) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OTP Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; text-align: center; padding: 20px;">
        <div style="max-width: 500px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333;">OTP Verification</h2>
            <p style="font-size: 16px; color: #555;">Your One-Time Password (OTP) for verification is:</p>
            <p style="font-size: 24px; font-weight: bold; color: #007bff; margin: 10px 0;">${otpCode}</p>
            <p style="font-size: 14px; color: #555;">This OTP is valid for only 15 minutes. Do not share it with anyone.</p>
            <p style="font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
            <div style="font-size: 14px; color: #777; margin-top: 20px;">
                <p>Best regards,<br>Your Company Name</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

