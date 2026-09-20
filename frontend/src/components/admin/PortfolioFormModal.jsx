import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';

const emptyForm = {
  title: '',
  order: '0',
  isActive: true,
};

const PortfolioFormModal = ({ item, onClose, onSaved }) => {
  const isEdit = Boolean(item);
  const [form, setForm] = useState(
    isEdit
      ? {
          title: item.title || '',
          order: item.order ?? 0,
          isActive: item.isActive,
        }
      : emptyForm
  );
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit && !image) {
      setError('Please choose an image for this book.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      data.append('title', form.title);
      data.append('order', form.order);
      data.append('isActive', form.isActive ? 'true' : 'false');
      if (image) data.append('image', image);

      const url = isEdit ? `${API_BASE_URL}/api/portfolio/${item._id}` : `${API_BASE_URL}/api/portfolio`;
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
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Title <span className="text-gray-400 font-normal">(optional, for your reference)</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Display Order</label>
            <input
              name="order"
              type="number"
              value={form.order}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-blue-200 rounded-md"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="portfolio-isActive"
              name="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="portfolio-isActive" className="text-sm font-medium text-blue-900">
              Show on homepage
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">
              Image {isEdit && '(leave blank to keep current)'}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
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

export default PortfolioFormModal;
