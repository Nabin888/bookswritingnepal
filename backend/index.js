import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import dns from 'dns';
import { fileURLToPath } from 'url';

// Use reliable DNS resolvers for MongoDB Atlas SRV record resolution
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (dnsErr) {
  console.warn('Could not set custom DNS servers:', dnsErr.message);
}
import { getTransporter } from './utils/mailer.js';
import booksRouter from './routes/books.js';
import ordersRouter from './routes/orders.js';
import adminRouter from './routes/admin.js';
import portfolioRouter from './routes/portfolio.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const allowedOrigins = [
  'https://bookswritingnepal.com',
  'https://www.bookswritingnepal.com',
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/books', booksRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);
app.use('/api/portfolio', portfolioRouter);

app.post('/send-email', async (req, res) => {
  console.log('Received POST /send-email', req.body);

  // Destructure all fields including service
  const { name, email, address, phone, about, when, service, budget } = req.body;

  // Create transporter with your Gmail credentials from .env
  const transporter = getTransporter();

  // Compose email HTML with service included
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Registration from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
        <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #e0e0e0; padding: 32px;">
          <h2 style="color: #2563eb; margin-bottom: 16px;">New Registration Details</h2>
          <table style="width: 100%; font-size: 16px;">
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Name:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Email:</td>
              <td style="padding: 8px 0;">${email}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Address:</td>
              <td style="padding: 8px 0;">${address}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Phone:</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">About Yourself:</td>
              <td style="padding: 8px 0;">${about}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">When to Start:</td>
              <td style="padding: 8px 0;">${when}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Service:</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; padding: 8px 0;">Budget:</td>
              <td style="padding: 8px 0;">${budget}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; text-align: center;">
            <span style="color: #888; font-size: 13px;">Book Writing Nepal &copy; ${new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
