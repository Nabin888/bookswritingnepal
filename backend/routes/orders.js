import express from 'express';
import Order from '../models/Order.js';
import Book from '../models/Book.js';
import { requireAdmin } from '../middleware/auth.js';
import { uploadPaymentScreenshot, PAYMENTS_UPLOAD_PATH } from '../middleware/upload.js';
import { getTransporter } from '../utils/mailer.js';

const router = express.Router();

// Public: place an order
router.post('/', (req, res) => {
  uploadPaymentScreenshot(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) {
      return res.status(400).json({ message: 'Payment screenshot is required' });
    }

    try {
      const { bookId, buyerName, phone, email, address } = req.body;
      const quantity = Math.max(1, parseInt(req.body.quantity, 10) || 1);

      const book = await Book.findById(bookId);
      if (!book || !book.isActive) {
        return res.status(404).json({ message: 'Book not found' });
      }
      if (book.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock available' });
      }

      const totalAmount = quantity * book.price * (1 - (book.discountPercent || 0) / 100);
      const paymentScreenshot = `${PAYMENTS_UPLOAD_PATH}/${req.file.filename}`;

      const order = await Order.create({
        book: book._id,
        bookTitle: book.title,
        unitPrice: book.price,
        quantity,
        totalAmount,
        buyerName,
        phone,
        email,
        address,
        paymentScreenshot,
      });

      book.stock -= quantity;
      book.sold += quantity;
      await book.save();

      res.status(201).json({ message: 'Order placed', order });

      // Email the admin — a failure here must not affect the response already sent.
      try {
        const transporter = getTransporter();
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Book Order: ${book.title}`,
          html: `
            <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
              <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px #e0e0e0; padding: 32px;">
                <h2 style="color: #2563eb; margin-bottom: 16px;">New Book Order</h2>
                <table style="width: 100%; font-size: 16px;">
                  <tr><td style="font-weight:bold; padding:8px 0;">Book:</td><td style="padding:8px 0;">${book.title}</td></tr>
                  <tr><td style="font-weight:bold; padding:8px 0;">Quantity:</td><td style="padding:8px 0;">${quantity}</td></tr>
                  <tr><td style="font-weight:bold; padding:8px 0;">Total:</td><td style="padding:8px 0;">Rs. ${totalAmount.toFixed(2)}</td></tr>
                  <tr><td style="font-weight:bold; padding:8px 0;">Buyer:</td><td style="padding:8px 0;">${buyerName}</td></tr>
                  <tr><td style="font-weight:bold; padding:8px 0;">Phone:</td><td style="padding:8px 0;">${phone}</td></tr>
                  <tr><td style="font-weight:bold; padding:8px 0;">Email:</td><td style="padding:8px 0;">${email}</td></tr>
                  <tr><td style="font-weight:bold; padding:8px 0;">Address:</td><td style="padding:8px 0;">${address}</td></tr>
                </table>
                <p style="margin-top:16px; color:#555;">Payment screenshot attached. Review the order in the admin dashboard.</p>
              </div>
            </div>
          `,
          attachments: [
            {
              filename: req.file.filename,
              path: req.file.path,
            },
          ],
        });
      } catch (mailErr) {
        console.error('Order placed but failed to email admin:', mailErr);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });
});

// Admin: list orders
router.get('/', requireAdmin, async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// Admin: update order status
router.patch('/:id', requireAdmin, async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

export default router;
