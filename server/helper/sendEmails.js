const nodemailer = require('nodemailer');

require('dotenv').config();
const googlePassword = process.env.GOOGLE_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'make.us.cocktail@gmail.com',
        pass: googlePassword
    }
});

module.exports = {
    verificationEmail: async (senderAddress, link) => {
    
    let message = {
        from: 'Cocktail World<cocktailsworld@gmail.com>',
        to: `${senderAddress}`,
        subject: 'Verify Email ✔',
        html: `<p>Please verify your email by clicking <a href=${link}> the link </a> This email will be valid for only 5 days</p>`
    };

    await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });
},

forgotPasswordEmail: async (senderAddress, link) => {
    
    let message = {
        from: 'Cocktail World<cocktailsworld@gmail.com>',
        to: `${senderAddress}`,
        subject: 'Reset Password',
        html: `Please reset your password by clicking  <a href="${link} "> the link </a>
        This link will be valid for only 5 days`,
    };

    await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
    });
},


};
