import express from 'express';
import jwt from 'jsonwebtoken';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token });
});

router.get('/me', requireAdmin, (req, res) => {
  res.json({ username: req.admin.username });
});

export default router;
