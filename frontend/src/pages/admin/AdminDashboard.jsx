import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BooksTable from '../../components/admin/BooksTable';
import OrdersTable from '../../components/admin/OrdersTable';
import PortfolioTable from '../../components/admin/PortfolioTable';

const TABS = [
  { key: 'books', label: 'Books', Component: BooksTable },
  { key: 'portfolio', label: 'Homepage Books', Component: PortfolioTable },
  { key: 'orders', label: 'Orders', Component: OrdersTable },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('books');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const ActiveComponent = TABS.find((t) => t.key === tab)?.Component;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-900">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-red-600 hover:underline text-sm font-medium">
            Log Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                tab === key ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
