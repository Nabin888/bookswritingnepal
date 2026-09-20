import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config';
import PortfolioFormModal from './PortfolioFormModal';

const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
});

const PortfolioTable = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(undefined); // undefined = closed, null = new, object = edit

  const loadItems = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/portfolio/admin/all`, { headers: authHeaders() })
      .then((res) => res.json())
      .then(setItems)
      .finally(() => setLoading(false));
  };

  useEffect(loadItems, []);

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title || 'this book'}"? This cannot be undone.`)) return;
    await fetch(`${API_BASE_URL}/api/portfolio/${item._id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    loadItems();
  };

  if (loading) return <p className="text-gray-500">Loading books...</p>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditingItem(null)}
          className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white font-semibold"
        >
          + Add Book
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left border-b border-gray-200 text-blue-900">
              <th className="py-2 pr-4">Image</th>
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Order</th>
              <th className="py-2 pr-4">Active</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-gray-100">
                <td className="py-2 pr-4">
                  {item.image && (
                    <img
                      src={item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image}`}
                      alt={item.title || 'Book'}
                      className="w-12 h-16 object-cover rounded-md border border-gray-200"
                    />
                  )}
                </td>
                <td className="py-2 pr-4 font-medium text-blue-900">{item.title || <span className="text-gray-400">(no title)</span>}</td>
                <td className="py-2 pr-4">{item.order}</td>
                <td className="py-2 pr-4">{item.isActive ? 'Yes' : 'No'}</td>
                <td className="py-2 pr-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
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
        {items.length === 0 && <p className="text-gray-500 py-6 text-center">No books yet.</p>}
      </div>

      {editingItem !== undefined && (
        <PortfolioFormModal
          item={editingItem}
          onClose={() => setEditingItem(undefined)}
          onSaved={() => {
            setEditingItem(undefined);
            loadItems();
          }}
        />
      )}
    </div>
  );
};

export default PortfolioTable;
