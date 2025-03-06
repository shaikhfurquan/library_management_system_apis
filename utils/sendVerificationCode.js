import { sendEmail } from "./sendEmail.js"
import { generateVerificationOtpEmailTemplate } from "./emailTemplate.js"


export async function sendVerificationCode(verificationCode , email , res){
    try {
        const message = generateVerificationOtpEmailTemplate(verificationCode)
        await sendEmail({
            email,
            subject: 'Verification Code (Library Management System)',
            message
        })
        res.status(200).json({
            success: true,
            message: 'Verification code sent successfully',
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error while sending verification code"
        })
    }
}

