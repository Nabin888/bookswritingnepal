import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import BookFormModal from './BookFormModal';

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
});

const BooksTable = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(undefined); // undefined = closed, null = new, object = edit
  const [stockDrafts, setStockDrafts] = useState({});

  const loadBooks = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/books/admin/all`, { headers: authHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setStockDrafts(Object.fromEntries(data.map((b) => [b._id, b.stock])));
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadBooks, []);

  const handleDelete = async (book) => {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;
    await fetch(`${API_BASE_URL}/api/books/${book._id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    loadBooks();
  };

  const handleStockSave = async (book) => {
    const stock = stockDrafts[book._id];
    await fetch(`${API_BASE_URL}/api/books/${book._id}/stock`, {
      method: 'PATCH',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock }),
    });
    loadBooks();
  };

  if (loading) return <p className="text-gray-500">Loading books...</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditingBook(null)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold"
        >
          + Add Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200 text-blue-900">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Discount</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Sold</th>
              <th className="py-2 pr-4">Active</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-b border-gray-100">
                <td className="py-2 pr-4 font-medium text-blue-900">{book.title}</td>
                <td className="py-2 pr-4">Rs. {book.price}</td>
                <td className="py-2 pr-4">{book.discountPercent || 0}%</td>
                <td className="py-2 pr-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      value={stockDrafts[book._id] ?? 0}
                      onChange={(e) =>
                        setStockDrafts((prev) => ({ ...prev, [book._id]: e.target.value }))
                      }
                      className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleStockSave(book)}
                      className="text-indigo-600 hover:underline"
                    >
                      Save
                    </button>
                  </div>
                </td>
                <td className="py-2 pr-4">{book.sold}</td>
                <td className="py-2 pr-4">{book.isActive ? 'Yes' : 'No'}</td>
                <td className="py-2 pr-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingBook(book)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {books.length === 0 && <p className="text-gray-500 py-6 text-center">No books yet.</p>}
      </div>

      {editingBook !== undefined && (
        <BookFormModal
          book={editingBook}
          onClose={() => setEditingBook(undefined)}
          onSaved={() => {
            setEditingBook(undefined);
            loadBooks();
          }}
        />
      )}
    </div>
  );
};

export default BooksTable;
