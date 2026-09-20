import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.join(__dirname, '..', 'uploads');
const booksDir = path.join(uploadsRoot, 'books');
const paymentsDir = path.join(uploadsRoot, 'payments');
const portfolioDir = path.join(uploadsRoot, 'portfolio');

for (const dir of [booksDir, paymentsDir, portfolioDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const imageFileFilter = (req, file, cb) => {
  if (/^image\/(jpeg|jpg|png|webp|gif)$/.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, png, webp, gif) are allowed'));
  }
};

const makeStorage = (destination) =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, unique);
    },
  });

const limits = { fileSize: 5 * 1024 * 1024 };

export const uploadBookImage = multer({
  storage: makeStorage(booksDir),
  fileFilter: imageFileFilter,
  limits,
}).single('coverImage');

export const uploadPaymentScreenshot = multer({
  storage: makeStorage(paymentsDir),
  fileFilter: imageFileFilter,
  limits,
}).single('paymentScreenshot');

export const uploadPortfolioImage = multer({
  storage: makeStorage(portfolioDir),
  fileFilter: imageFileFilter,
  limits,
}).single('image');

export const BOOKS_UPLOAD_PATH = '/uploads/books';
export const PAYMENTS_UPLOAD_PATH = '/uploads/payments';
export const PORTFOLIO_UPLOAD_PATH = '/uploads/portfolio';
