import dns from 'dns';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Book from './models/Book.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

const sampleBooks = [
  {
    title: 'The Power of Your Subconscious Mind',
    author: 'Joseph Murphy',
    description: 'A classic guide to using the power of your subconscious mind.',
    price: 375,
    discountPercent: 26,
    stock: 25,
    category: 'Self Help',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'Tiny changes, remarkable results.',
    price: 280,
    discountPercent: 3,
    stock: 40,
    category: 'Self Help',
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    description: 'Timeless lessons on wealth, greed, and happiness.',
    price: 580,
    discountPercent: 9,
    stock: 15,
    category: 'Finance',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  await Book.deleteMany({});
  await Book.insertMany(sampleBooks);
  console.log(`Inserted ${sampleBooks.length} sample books`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
