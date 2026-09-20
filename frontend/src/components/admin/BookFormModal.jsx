import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';

const emptyForm = {
  title: '',
  author: '',
  description: '',
  price: '',
  discountPercent: '',
  stock: '',
  category: '',
};

const BookFormModal = ({ book, onClose, onSaved }) => {
  const isEdit = Boolean(book);
  const [form, setForm] = useState(
    isEdit
      ? {
          title: book.title || '',
          author: book.author || '',
          description: book.description || '',
          price: book.price ?? '',
          discountPercent: book.discountPercent ?? '',
          stock: book.stock ?? '',
          category: book.category || '',
        }
      : emptyForm
  );
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (coverImage) data.append('coverImage', coverImage);

      const url = isEdit ? `${API_BASE_URL}/api/books/${book._id}` : `${API_BASE_URL}/api/books`;
      const res = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to save book');
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {isEdit ? 'Edit Book' : 'Add Book'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-blue-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Author</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-blue-200 rounded-md resize-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Price (Rs.)</label>
              <input
                name="price"
                type="number"
                min={0}
                value={form.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Discount %</label>
              <input
                name="discountPercent"
                type="number"
                min={0}
                max={100}
                value={form.discountPercent}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-blue-200 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-1">Stock</label>
              <input
                name="stock"
                type="number"
                min={0}
                value={form.stock}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-blue-200 rounded-md"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Category</label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Cover Image {isEdit && '(leave blank to keep current)'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files[0])}
              className="w-full px-3 py-2 border border-blue-200 rounded-md bg-white"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormModal;
