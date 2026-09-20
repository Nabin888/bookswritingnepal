import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { API_BASE_URL } from '../config';

const BookCard = ({ book }) => {
  const hasDiscount = book.discountPercent > 0;
  const discountedPrice = hasDiscount
    ? (book.price * (1 - book.discountPercent / 100)).toFixed(0)
    : book.price;
  const outOfStock = book.stock <= 0;

  const coverSrc = book.coverImage
    ? book.coverImage.startsWith('http')
      ? book.coverImage
      : `${API_BASE_URL}${book.coverImage}`
    : null;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl hover:border-indigo-400 transition-all flex flex-col">
      <Link to={`/shop/buy/${book._id}`} className="relative block bg-gray-50">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={book.title}
            className="w-full h-56 object-cover"
          />
        ) : (
          <div className="w-full h-56 flex items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{book.discountPercent}%
          </span>
        )}
        {outOfStock && (
          <span className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
            Out of Stock
          </span>
        )}
      </Link>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-1 text-xs text-amber-500 mb-1">
          <span className="bg-amber-400 text-white font-bold px-1.5 py-0.5 rounded text-[11px]">
            {book.rating ? book.rating.toFixed(1) : '8.8'}
          </span>
          <FaStar className="text-amber-400" />
        </div>

        <h3 className="text-sm font-semibold text-blue-900 line-clamp-2 min-h-[2.5rem]">
          {book.title}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-red-600">Rs. {discountedPrice}</span>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through">Rs. {book.price}</span>
          )}
        </div>

        <div className="text-xs text-gray-500 mt-1">{book.sold || 0} sold</div>

        <Link
          to={`/shop/buy/${book._id}`}
          className={`mt-3 w-full text-center py-2 rounded-full text-sm font-semibold transition-all ${
            outOfStock
              ? 'bg-gray-200 text-gray-500 pointer-events-none'
              : 'bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white hover:from-indigo-600 hover:to-purple-600'
          }`}
        >
          {outOfStock ? 'Out of Stock' : 'Buy Now'}
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
