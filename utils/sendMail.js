import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
        user: 'kushagrag.2082002@gmail.com', // Replace with your email
        pass: 'grwyjhmtarnmfcon' // Replace with your email password
    }
});

export const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'kushagrag.2082002@gmail.com',
        to,
        subject,
        text
    };

    return transporter.sendMail(mailOptions);
};
