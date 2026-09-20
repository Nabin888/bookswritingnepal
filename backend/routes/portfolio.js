import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Portfolio from '../models/Portfolio.js';
import { requireAdmin } from '../middleware/auth.js';
import { uploadPortfolioImage, PORTFOLIO_UPLOAD_PATH } from '../middleware/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Public: list active portfolio items
router.get('/', async (req, res) => {
  const items = await Portfolio.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
  res.json(items);
});

// Admin: full list (including inactive)
router.get('/admin/all', requireAdmin, async (req, res) => {
  const items = await Portfolio.find().sort({ order: 1, createdAt: 1 });
  res.json(items);
});

// Admin: create item
router.post('/', requireAdmin, (req, res) => {
  uploadPortfolioImage(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    try {
      const { title, order, isActive } = req.body;
      const item = await Portfolio.create({
        title,
        order: order || 0,
        isActive: isActive === undefined ? true : isActive === 'true' || isActive === true,
        image: req.file ? `${PORTFOLIO_UPLOAD_PATH}/${req.file.filename}` : '',
      });
      res.status(201).json(item);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });
});

// Admin: update item (optionally replace image)
router.put('/:id', requireAdmin, (req, res) => {
  uploadPortfolioImage(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message });
    try {
      const item = await Portfolio.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });

      const { title, order, isActive } = req.body;
      if (title !== undefined) item.title = title;
      if (order !== undefined) item.order = order;
      if (isActive !== undefined) item.isActive = isActive === 'true' || isActive === true;

      if (req.file) {
        if (item.image) {
          const oldPath = path.join(__dirname, '..', item.image);
          fs.unlink(oldPath, () => {});
        }
        item.image = `${PORTFOLIO_UPLOAD_PATH}/${req.file.filename}`;
      }

      await item.save();
      res.json(item);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  });
});

// Admin: delete item
router.delete('/:id', requireAdmin, async (req, res) => {
  const item = await Portfolio.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  if (item.image) {
    fs.unlink(path.join(__dirname, '..', item.image), () => {});
  }
  res.json({ message: 'Item deleted' });
});

export default router;
