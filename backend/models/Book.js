import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, trim: true, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    coverImage: { type: String, default: '' },
    stock: { type: Number, required: true, default: 0, min: 0 },
    sold: { type: Number, default: 0, min: 0 },
    category: { type: String, trim: true, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Book', bookSchema);
