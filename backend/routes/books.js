import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Book from '../models/Book.js';
import { requireAdmin } from '../middleware/auth.js';
import { uploadBookImage, BOOKS_UPLOAD_PATH } from '../middleware/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Public: list active books
router.get('/', async (req, res) => {
  const books = await Book.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(books);
});

// Public: single book
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Admin: full list (including inactive)
router.get('/admin/all', requireAdmin, async (req, res) => {
  const books = await Book.find().sort({ createdAt: -1 });
  res.json(books);
});

// Admin: create book
router.post('/', requireAdmin, (req, res) => {
  uploadBookImage(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    try {
      const { title, author, description, price, discountPercent, stock, category } = req.body;
      const book = await Book.create({
        title,
        author,
        description,
        price,
        discountPercent: discountPercent || 0,
        stock,
        category,
        coverImage: req.file ? `${BOOKS_UPLOAD_PATH}/${req.file.filename}` : '',
      });
      res.status(201).json(book);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });
});

// Admin: update book (optionally replace cover image)
router.put('/:id', requireAdmin, (req, res) => {
  uploadBookImage(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });

      const { title, author, description, price, discountPercent, stock, category, isActive } = req.body;
      if (title !== undefined) book.title = title;
      if (author !== undefined) book.author = author;
      if (description !== undefined) book.description = description;
      if (price !== undefined) book.price = price;
      if (discountPercent !== undefined) book.discountPercent = discountPercent;
      if (stock !== undefined) book.stock = stock;
      if (category !== undefined) book.category = category;
      if (isActive !== undefined) book.isActive = isActive === 'true' || isActive === true;

      if (req.file) {
        if (book.coverImage) {
          const oldPath = path.join(__dirname, '..', book.coverImage);
          fs.unlink(oldPath, () => {});
        }
        book.coverImage = `${BOOKS_UPLOAD_PATH}/${req.file.filename}`;
      }

      await book.save();
      res.json(book);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });
});

// Admin: adjust stock only
router.patch('/:id/stock', requireAdmin, async (req, res) => {
  const { stock } = req.body;
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    { stock },
    { new: true, runValidators: true }
  );
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

// Admin: delete book
router.delete('/:id', requireAdmin, async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  if (book.coverImage) {
    fs.unlink(path.join(__dirname, '..', book.coverImage), () => {});
  }
  res.json({ message: 'Book deleted' });
});

export default router;
