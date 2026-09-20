import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { API_BASE_URL } from '../config';

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => setError('Could not load books right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Navbar />
      <section className="bg-white py-12 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-2">
            Shop Our Books
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Pick a book, pay via QR, and we'll get it to you.
          </p>

          {loading && <p className="text-center text-gray-500">Loading books...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && books.length === 0 && (
            <p className="text-center text-gray-500">No books available right now.</p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Shop;
