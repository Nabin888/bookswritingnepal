import dns from 'dns';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Portfolio from './models/Portfolio.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, '..', 'frontend', 'src', 'assets');
const portfolioDir = path.join(__dirname, 'uploads', 'portfolio');

// Order matches the previous hardcoded homepage carousel: b1, b6, b4, b2, b3
const sourceImages = ['b1.jpg', 'b6.jpg', 'b4.jpg', 'b2.jpg', 'b3.jpg'];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  fs.rmSync(portfolioDir, { recursive: true, force: true });
  fs.mkdirSync(portfolioDir, { recursive: true });

  const docs = sourceImages.map((filename, index) => {
    const srcPath = path.join(assetsDir, filename);
    const ext = path.extname(filename).toLowerCase();
    const destFilename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    fs.copyFileSync(srcPath, path.join(portfolioDir, destFilename));

    return {
      title: '',
      image: `/uploads/portfolio/${destFilename}`,
      order: index,
      isActive: true,
    };
  });

  await Portfolio.deleteMany({});
  await Portfolio.insertMany(docs);
  console.log(`Inserted ${docs.length} portfolio items`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
