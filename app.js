require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));

app.post('/pay', async (req, res) => {
    const { name, email, studentId, course, semester, paymentMethod, amount } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'omyapvt0405@gmail.com',
            pass: process.env.EMAIL_PASSWORD  // Use the 16-character app password
        }
    });

    // HTML formatted email with more details
    const mailOptions = {
        from: 'omyapvt0405@gmail.com',
        to: email,
        subject: 'Payment Confirmation',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f8f9fa;">
            <h2 style="color: #0056b3;">Payment Confirmation</h2>
            <p>Dear <strong>${name}</strong>,</p>
            <p>We have successfully received your payment of <strong>₹${amount}</strong>.</p>
            <p>Below is your payment summary:</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #e0e0e0; padding: 10px;">
                    <td><strong>Name:</strong></td>
                    <td>${name}</td>
                </tr>
                <tr>
                    <td><strong>Student ID:</strong></td>
                    <td>${studentId}</td>
                </tr>
                <tr style="background-color: #e0e0e0;">
                    <td><strong>Course:</strong></td>
                    <td>${course}</td>
                </tr>
                <tr>
                    <td><strong>Semester:</strong></td>
                    <td>${semester}</td>
                </tr>
                <tr style="background-color: #e0e0e0;">
                    <td><strong>Payment Method:</strong></td>
                    <td>${paymentMethod}</td>
                </tr>
                <tr>
                    <td><strong>Amount Paid:</strong></td>
                    <td>₹${amount}</td>
                </tr>
                <tr style="background-color: #e0e0e0;">
                    <td><strong>Payment Date:</strong></td>
                    <td>${new Date().toLocaleDateString()}</td>
                </tr>
            </table>
            <br>
            <p>Thank you for your payment!</p>
            <p>Best regards,</p>
            <p><strong>IIT Bombay</strong></p>
        </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Payment successful and email sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment failed or email could not be sent.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
